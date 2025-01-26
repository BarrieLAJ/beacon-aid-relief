import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BeaconAidRelief } from "../target/types/beacon_aid_relief";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";

describe("beacon-aid-relief", () => {
	// Configure the client to use the local cluster
	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);

	const program = anchor.workspace.BeaconAidRelief as Program<BeaconAidRelief>;

	// Test campaign details
	const campaignName = "Test Campaign";
	const campaignDescription = "A test fundraising campaign";
	const campaignGoal = new anchor.BN(5 * LAMPORTS_PER_SOL); // 5 SOL

	it("Creates a campaign", async () => {
		// Generate a new keypair for the campaign account
		const campaign = anchor.web3.Keypair.generate();

		await program.methods
			.createCampaign(campaignName, campaignDescription, campaignGoal)
			.accounts({
				campaign: campaign.publicKey,
				creator: provider.wallet.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			})
			.signers([campaign])
			.rpc();

		// Fetch the campaign account
		const campaignAccount = await program.account.campaign.fetch(
			campaign.publicKey
		);

		// Verify the campaign details
		expect(campaignAccount.creator.toString()).to.equal(
			provider.wallet.publicKey.toString()
		);
		expect(campaignAccount.name).to.equal(campaignName);
		expect(campaignAccount.description).to.equal(campaignDescription);
		expect(campaignAccount.goal.toString()).to.equal(campaignGoal.toString());
		expect(campaignAccount.raisedAmount.toString()).to.equal("0");
	});

	it("Allows donations to a campaign", async () => {
		// Create a new campaign
		const campaign = anchor.web3.Keypair.generate();
		await program.methods
			.createCampaign(campaignName, campaignDescription, campaignGoal)
			.accounts({
				campaign: campaign.publicKey,
				creator: provider.wallet.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			})
			.signers([campaign])
			.rpc();

		// Create a donor with some SOL
		const donor = anchor.web3.Keypair.generate();
		const donationAmount = new anchor.BN(1 * LAMPORTS_PER_SOL); // 1 SOL

		// Airdrop some SOL to the donor
		const signature = await provider.connection.requestAirdrop(
			donor.publicKey,
			2 * LAMPORTS_PER_SOL
		);
		await provider.connection.confirmTransaction(signature);

		// Make a donation
		await program.methods
			.donate(donationAmount)
			.accounts({
				campaign: campaign.publicKey,
				donor: donor.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			})
			.signers([donor])
			.rpc();

		// Verify the donation
		const campaignAccount = await program.account.campaign.fetch(
			campaign.publicKey
		);
		expect(campaignAccount.raisedAmount.toString()).to.equal(
			donationAmount.toString()
		);
	});

	it("Allows creator to withdraw funds", async () => {
		// Create a new campaign
		const campaign = anchor.web3.Keypair.generate();
		await program.methods
			.createCampaign(campaignName, campaignDescription, campaignGoal)
			.accounts({
				campaign: campaign.publicKey,
				creator: provider.wallet.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			})
			.signers([campaign])
			.rpc();

		// Make a donation first
		const donor = anchor.web3.Keypair.generate();
		const donationAmount = new anchor.BN(1 * LAMPORTS_PER_SOL);

		// Airdrop SOL to donor
		const signature = await provider.connection.requestAirdrop(
			donor.publicKey,
			2 * LAMPORTS_PER_SOL
		);
		await provider.connection.confirmTransaction(signature);

		// Donate
		await program.methods
			.donate(donationAmount)
			.accounts({
				campaign: campaign.publicKey,
				donor: donor.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			})
			.signers([donor])
			.rpc();

		// Get creator's initial balance
		const creatorInitialBalance = await provider.connection.getBalance(
			provider.wallet.publicKey
		);

		// Withdraw funds
		await program.methods
			.withdraw()
			.accounts({
				campaign: campaign.publicKey,
				creator: provider.wallet.publicKey,
			})
			.rpc();

		// Verify withdrawal
		const campaignAccount = await program.account.campaign.fetch(
			campaign.publicKey
		);
		expect(campaignAccount.raisedAmount.toString()).to.equal("0");

		// Verify creator received the funds
		const creatorFinalBalance = await provider.connection.getBalance(
			provider.wallet.publicKey
		);
		expect(creatorFinalBalance).to.be.above(creatorInitialBalance);
	});
});
