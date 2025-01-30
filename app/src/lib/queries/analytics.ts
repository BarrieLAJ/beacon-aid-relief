import { createClient } from "@/integrations/supabase/client";
import type {
	AnalyticsData,
	DonationWithMetadata,
	MonthlyTrend,
	CategoryDistribution,
	DonorRetention,
	GeographicDistribution,
} from "@/types/analytics";

export async function fetchAnalyticsData(
	startDate?: Date,
	endDate?: Date
): Promise<AnalyticsData> {
	const supabase = createClient();

	// Default to last 6 months if no date range provided
	const defaultStartDate = new Date();
	defaultStartDate.setMonth(defaultStartDate.getMonth() - 6);

	const start = startDate || defaultStartDate;
	const end = endDate || new Date();

	const { data: donations, error } = await supabase
		.from("donations")
		.select(
			`
			amount,
			created_at,
			donor_id,
			campaigns (
				category,
				location
			)
		`
		)
		.gte("created_at", start.toISOString())
		.lte("created_at", end.toISOString());

	if (error || !donations) {
		return getEmptyAnalyticsData();
	}

	return {
		monthlyTrends: processMonthlyTrends(donations as DonationWithMetadata[]),
		campaignCategories: processCampaignCategories(
			donations as DonationWithMetadata[]
		),
		donorRetention: processDonorRetention(donations as DonationWithMetadata[]),
		geographicData: processGeographicDistribution(
			donations as DonationWithMetadata[]
		),
		dateRange: { start, end },
	};
}

function getEmptyAnalyticsData(): AnalyticsData {
	return {
		monthlyTrends: [],
		campaignCategories: [],
		donorRetention: [],
		geographicData: [],
	};
}

function processMonthlyTrends(
	donations: DonationWithMetadata[]
): MonthlyTrend[] {
	const monthlyData = new Map<
		string,
		{ total: number; count: number; amount: number }
	>();

	donations.forEach((donation) => {
		const month = new Date(donation.created_at).toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
		const current = monthlyData.get(month) || { total: 0, count: 0, amount: 0 };

		monthlyData.set(month, {
			total: current.total + 1,
			count: current.count + 1,
			amount: current.amount + donation.amount,
		});
	});

	return Array.from(monthlyData.entries())
		.map(([month, data]) => ({
			month,
			totalDonations: data.total,
			totalAmount: data.amount,
			avgDonationSize: data.amount / data.count,
		}))
		.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

function processCampaignCategories(
	donations: DonationWithMetadata[]
): CategoryDistribution[] {
	const categories = new Map<string, number>();

	donations.forEach((donation) => {
		const category = donation.campaigns[0]?.category;
		if (category) {
			categories.set(category, (categories.get(category) || 0) + 1);
		}
	});

	return Array.from(categories.entries())
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value);
}

function processDonorRetention(
	donations: DonationWithMetadata[]
): DonorRetention[] {
	const monthlyDonors = new Map<string, Set<string>>();
	const knownDonors = new Set<string>();

	donations.forEach((donation) => {
		const month = new Date(donation.created_at).toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
		if (!monthlyDonors.has(month)) {
			monthlyDonors.set(month, new Set());
		}
		monthlyDonors.get(month)!.add(donation.donor_id);
	});

	return Array.from(monthlyDonors.entries())
		.map(([month, donors]) => {
			const newDonors = Array.from(donors).filter(
				(donor) => !knownDonors.has(donor)
			).length;
			const returningDonors = donors.size - newDonors;

			// Update known donors for next month
			donors.forEach((donor) => knownDonors.add(donor));

			return { month, newDonors, returningDonors };
		})
		.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

function processGeographicDistribution(
	donations: DonationWithMetadata[]
): GeographicDistribution[] {
	const locations = new Map<string, number>();

	donations.forEach((donation) => {
		const location = donation.campaigns[0]?.location;
		if (location) {
			locations.set(location, (locations.get(location) || 0) + donation.amount);
		}
	});

	return Array.from(locations.entries())
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value)
		.slice(0, 10); // Only show top 10 locations
}
