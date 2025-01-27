import { useEffect, useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { useCampaignService } from "@/services/campaign";
import type { Database } from "@/integrations/supabase/types";

type DbCampaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface Donation {
	amount: number;
	donor_id: string;
	message: string | null;
	created_at: string;
}

interface Campaign extends Omit<DbCampaign, "donations"> {
	donations: Donation[];
}

export function CampaignGrid() {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const campaignService = useCampaignService();

	const loadCampaigns = async () => {
		try {
			setIsLoading(true);
			const data = await campaignService.getAllCampaigns();
			// Transform the data to match our Campaign type
			const transformedData: Campaign[] = (data || []).map((campaign) => ({
				...campaign,
				donations: (campaign.donations || []).map((donation) => ({
					amount: donation.amount,
					donor_id: donation.donor_id || "anonymous",
					message: donation.message,
					created_at: donation.created_at,
				})),
			}));
			setCampaigns(transformedData);
		} catch (error) {
			console.error("Failed to load campaigns:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadCampaigns();
	}, []);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="h-[400px] animate-pulse rounded-lg bg-gray-200" />
				))}
			</div>
		);
	}

	if (campaigns.length === 0) {
		return (
			<div className="text-center">
				<h3 className="text-xl font-semibold">No campaigns yet</h3>
				<p className="text-gray-500">Be the first to create a campaign!</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{campaigns.map((campaign) => (
				<CampaignCard
					key={campaign.id}
					id={campaign.id}
					title={campaign.title}
					description={campaign.description}
					goal={campaign.goal || 0}
					raised={campaign.raised || 0}
					imageUrl={campaign.image_url}
					donations={campaign.donations}
					onDonationSuccess={loadCampaigns}
				/>
			))}
		</div>
	);
}
