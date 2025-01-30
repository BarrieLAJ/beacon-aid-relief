import { createClient } from "@/integrations/supabase/client";
import type { Campaign, CampaignResponse } from "@/types/campaign";

export async function fetchUserCampaigns(): Promise<Campaign[]> {
	const supabase = createClient();
	const { data: campaigns, error } = await supabase
		.from("campaigns")
		.select(
			`
      id,
      title,
      goal,
      raised,
      status,
      created_at,
      donations (
        donor_id
      )
    `
		)
		.order("created_at", { ascending: false });

	if (error) throw error;
	if (!campaigns) return [];

	return campaigns.map((campaign: CampaignResponse) => ({
		id: campaign.id,
		title: campaign.title,
		goal: campaign.goal,
		raised: campaign.raised,
		status: campaign.status as Campaign["status"],
		donors: new Set(campaign.donations?.map((d) => d.donor_id) || []).size,
		created: new Date(campaign.created_at).toISOString().split("T")[0],
	}));
}
