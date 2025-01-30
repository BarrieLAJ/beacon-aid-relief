import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import { createClient } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { BeaconAidRelief } from "../../../target/types/beacon_aid_relief";

const supabase = createClient();

const PROGRAM_ID = new PublicKey(
	"BhENLVpEECmmibKWHiHKCxch3Q6FHTJ42faPASkLWSMS"
);

type CampaignInsert = Database["public"]["Tables"]["campaigns"]["Insert"];
type DonationInsert = Database["public"]["Tables"]["donations"]["Insert"];

type DbCampaign = Database["public"]["Tables"]["campaigns"]["Row"];
type DbDonation = Database["public"]["Tables"]["donations"]["Row"];

interface CampaignWithDonations extends DbCampaign {
	donations: DbDonation[];
}

export class CampaignService {
	constructor(
		private program: Program<BeaconAidRelief>,
		private wallet: { publicKey: PublicKey }
	) {}

	static async init(
		connection: Connection,
		wallet: { publicKey: PublicKey }
	): Promise<CampaignService> {
		const idl = (await import(
			"../../../target/idl/beacon_aid_relief.json"
		)) as unknown as BeaconAidRelief;
		const provider = new AnchorProvider(
			connection,
			{
				publicKey: wallet.publicKey,
				signTransaction: async (tx) => tx,
				signAllTransactions: async (txs) => txs,
			},
			{ commitment: "processed" }
		);
		const program = new Program(idl, PROGRAM_ID, provider);
		return new CampaignService(program, wallet);
	}

	async createCampaign(
		title: string,
		description: string,
		targetAmount: number,
		endDate: number,
		category: string,
		location: string,
		imageUrl?: string
	) {
		// First create campaign in Solana
		const campaign = Keypair.generate();

		await this.program.methods
			.createCampaign(title, description, new BN(targetAmount))
			.accounts({
				campaign: campaign.publicKey,
				creator: this.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			})
			.signers([campaign])
			.rpc();

		// Then store additional metadata in Supabase
		const { data: userData } = await supabase.auth.getUser();
		if (!userData.user) throw new Error("User not authenticated");

		const campaignData: CampaignInsert = {
			title,
			description,
			goal: targetAmount,
			category,
			location,
			end_date: new Date(endDate).toISOString(),
			image_url: imageUrl || null,
			user_id: userData.user.id,
			creator_wallet: this.wallet.publicKey.toString(),
			solana_address: campaign.publicKey.toString(),
			status: "active",
			raised: 0,
		};

		const { error } = await supabase.from("campaigns").insert(campaignData);

		if (error) throw error;

		return {
			supabaseId: error ? undefined : "success",
			solanaAddress: campaign.publicKey.toString(),
			creatorWallet: this.wallet.publicKey.toString(),
		};
	}

	async donate(campaignId: string, amount: number, message?: string) {
		// Get campaign Solana address
		const { data: campaign, error: fetchError } = await supabase
			.from("campaigns")
			.select("solana_address, raised")
			.eq("id", campaignId)
			.single();

		if (fetchError || !campaign?.solana_address) {
			throw new Error("Campaign not found");
		}

		const campaignPubkey = new PublicKey(campaign.solana_address);
		const currentRaised = campaign.raised || 0;

		// Execute Solana donation
		const tx = await this.program.methods
			.donate(new BN(amount))
			.accounts({
				campaign: campaignPubkey,
				donor: this.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			})
			.rpc();

		// Record donation in Supabase
		const donationData: DonationInsert = {
			amount,
			campaign_id: campaignId,
			donor_id: this.wallet.publicKey.toString(),
			message: message || null,
			transaction_signature: tx,
		};

		const { error } = await supabase.from("donations").insert(donationData);

		if (error) throw error;

		// Update campaign raised amount
		const { error: updateError } = await supabase
			.from("campaigns")
			.update({ raised: currentRaised + amount })
			.eq("id", campaignId);

		if (updateError) throw updateError;

		return {
			campaignId,
			amount,
			donorAddress: this.wallet.publicKey.toString(),
			transactionSignature: tx,
		};
	}

	async getAllDonations() {
		const { data: donations, error } = await supabase
			.from("donations")
			.select(
				`
				*,
				campaign_id (
					title,
					description,
					goal,
					raised
				)
			`
			)
			.order("created_at", { ascending: false });
		if (error) throw error;

		return donations;
	}

	async getCampaign(campaignId: string) {
		// Get campaign data from both Solana and Supabase
		const { data: campaign, error: supabaseError } = await supabase
			.from("campaigns")
			.select(
				`
				*,
				donations (
					id,
					amount,
					donor_id,
					message,
					created_at,
					transaction_signature
				)
			`
			)
			.eq("id", campaignId)
			.single();

		if (supabaseError || !campaign?.solana_address) {
			throw new Error("Campaign not found");
		}

		// Get Solana campaign data
		const solanaData = await this.program.account.campaign.fetch(
			new PublicKey(campaign.solana_address)
		);

		return {
			...campaign,
			solanaData,
		};
	}

	async getAllCampaigns(): Promise<CampaignWithDonations[]> {
		const { data, error } = await supabase
			.from("campaigns")
			.select(
				`
				*,
				donations (
					id,
					amount,
					donor_id,
					message,
					created_at,
					campaign_id
				)
			`
			)
			.eq("status", "active")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data || [];
	}

	async withdraw(campaignId: string) {
		// Get campaign Solana address and verify creator
		const { data: campaign, error: fetchError } = await supabase
			.from("campaigns")
			.select("solana_address, user_id")
			.eq("id", campaignId)
			.single();

		if (fetchError || !campaign?.solana_address) {
			throw new Error("Campaign not found");
		}

		const campaignPubkey = new PublicKey(campaign.solana_address);

		// Execute Solana withdrawal
		const tx = await this.program.methods
			.withdraw()
			.accounts({
				campaign: campaignPubkey,
				creator: this.wallet.publicKey,
			})
			.rpc();

		// Update campaign status in Supabase
		const { error: updateError } = await supabase
			.from("campaigns")
			.update({
				status: "completed",
				raised: 0, // Reset raised amount after withdrawal
			})
			.eq("id", campaignId);

		if (updateError) throw updateError;

		return {
			campaignId,
			status: "completed",
			transactionSignature: tx,
		};
	}
}

// React Hook for using the Campaign Service
export const useCampaignService = () => {
	const { isConnected, address } = useAppKitAccount();
	const { connection } = useAppKitConnection();

	const getService = async (shouldCheckWallet = true) => {
		let wallet;
		if (shouldCheckWallet && (!isConnected || !address)) {
			wallet = Keypair.generate();
			console.warn("Wallet not connected");
		} else if (shouldCheckWallet && isConnected && address) {
			wallet = {
				publicKey: new PublicKey(address),
			};
		}
		return await CampaignService.init(connection!, wallet!);
	};

	return {
		createCampaign: async (
			title: string,
			description: string,
			targetAmount: number,
			endDate: number,
			category: string,
			location: string,
			imageUrl?: string
		) => {
			const service = await getService();
			return await service.createCampaign(
				title,
				description,
				targetAmount,
				endDate,
				category,
				location,
				imageUrl
			);
		},
		donate: async (campaignId: string, amount: number, message?: string) => {
			const service = await getService();
			return await service.donate(campaignId, amount, message);
		},
		withdraw: async (campaignId: string) => {
			const service = await getService();
			return await service.withdraw(campaignId);
		},
		getCampaign: async (campaignId: string) => {
			const service = await getService();
			return await service.getCampaign(campaignId);
		},
		getAllCampaigns: async () => {
			const service = await getService();
			return await service.getAllCampaigns();
		},
	};
};
