import { createClient } from "@/integrations/supabase/client";

export async function fetchDashboardData() {
	const supabase = createClient();
	const { data: campaigns, error } = await supabase.from("campaigns").select(`
    id,
    status,
    raised,
    donations (
      amount,
      donor_id,
      created_at
    )
  `);

	if (error) throw error;
	if (!campaigns) return null;

	// Calculate stats
	const totalCampaigns = campaigns.length;
	const totalRaised = campaigns.reduce(
		(sum, campaign) => sum + (campaign.raised || 0),
		0
	);
	const uniqueDonors = new Set(
		campaigns.flatMap((c) => c.donations?.map((d) => d.donor_id) || [])
	).size;
	const completedCampaigns = campaigns.filter(
		(c) => c.status === "completed"
	).length;
	const successRate =
		totalCampaigns > 0 ? (completedCampaigns / totalCampaigns) * 100 : 0;

	// Calculate monthly donations
	const last6Months = Array.from({ length: 6 }, (_, i) => {
		const date = new Date();
		date.setMonth(date.getMonth() - i);
		return date.toISOString().slice(0, 7);
	}).reverse();

	const monthlyDonations = last6Months.map((month) => {
		const total = campaigns.reduce((sum, campaign) => {
			const monthDonations =
				campaign.donations?.filter((d) => d.created_at.startsWith(month)) || [];
			return sum + monthDonations.reduce((s, d) => s + (d.amount || 0), 0);
		}, 0);

		return {
			name: new Date(month).toLocaleString("default", { month: "short" }),
			total,
		};
	});

	return {
		stats: {
			totalCampaigns,
			totalRaised,
			activeDonors: uniqueDonors,
			successRate,
		},
		chartData: monthlyDonations,
	};
}
