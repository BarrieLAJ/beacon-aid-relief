import { useEffect, useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { useCampaignService } from "@/services/campaign";
import type { Database } from "@/integrations/supabase/types";

type DbCampaign = Database["public"]["Tables"]["campaigns"]["Row"];
type DbDonation = Database["public"]["Tables"]["donations"]["Row"];

interface Campaign extends DbCampaign {
	donations: Array<DbDonation & { donor_id: string }>;
}

export function CampaignGrid() {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const campaignService = useCampaignService();

	const loadCampaigns = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const data = await campaignService.getAllCampaigns();
			const transformedData: Campaign[] = data.map((campaign) => ({
				...campaign,
				donations: campaign.donations.map((donation) => ({
					...donation,
					donor_id: donation.donor_id || "anonymous",
				})),
			}));

			setCampaigns(transformedData);
		} catch (err) {
			console.error("Error loading campaigns:", err);
			setError("Failed to load campaigns. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadCampaigns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		return (
			<div className="text-center">
				<h3 className="text-xl font-semibold text-red-600">Error</h3>
				<p className="text-gray-500">{error}</p>
				<button
					onClick={loadCampaigns}
					className="mt-4 text-sm text-blue-600 hover:underline"
				>
					Try Again
				</button>
			</div>
		);
	}

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
					goal={campaign.goal}
					raised={campaign.raised || 0}
					imageUrl={campaign.image_url}
					donations={campaign.donations}
					onDonationSuccess={loadCampaigns}
				/>
			))}
		</div>
	);
}
