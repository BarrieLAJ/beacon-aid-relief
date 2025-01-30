export interface MonthlyTrend {
	month: string;
	totalDonations: number;
	totalAmount: number;
	avgDonationSize: number;
}

export interface CategoryDistribution {
	name: string;
	value: number;
}

export interface DonorRetention {
	month: string;
	newDonors: number;
	returningDonors: number;
}

export interface GeographicDistribution {
	name: string;
	value: number;
}

export interface AnalyticsData {
	monthlyTrends: MonthlyTrend[];
	campaignCategories: CategoryDistribution[];
	donorRetention: DonorRetention[];
	geographicData: GeographicDistribution[];
	dateRange?: {
		start: Date;
		end: Date;
	};
}

export interface DonationWithMetadata {
	amount: number;
	created_at: string;
	donor_id: string;
	campaigns: {
		category: string;
		location: string;
	}[];
}
