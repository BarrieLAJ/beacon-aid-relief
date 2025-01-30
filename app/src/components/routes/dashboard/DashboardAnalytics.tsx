"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { MonthlyTrendsChart } from "@/components/analytics/MonthlyTrendsChart";
import { DonorRetentionChart } from "@/components/analytics/DonorRetentionChart";
import { GeographicDistributionChart } from "@/components/analytics/GeographicDistributionChart";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { AnalyticsSkeleton } from "@/components/analytics/AnalyticsSkeleton";
import { CampaignCategoriesChart } from "@/components/analytics/CampaignCategoriesChart";

export default function DashboardAnalytics() {
	const { data, isLoading, isError, error, refetch } = useAnalytics();

	if (isLoading) {
		return <AnalyticsSkeleton />;
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					Error loading analytics: {error?.message || "Unknown error"}
					<Button
						variant="outline"
						size="sm"
						className="ml-2"
						onClick={() => refetch()}
					>
						<RefreshCw className="h-4 w-4 mr-2" />
						Retry
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!data) return null;

	return (
		<div className="py-6 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
					<Button
						variant="outline"
						size="sm"
						onClick={() => refetch()}
						className="ml-2"
					>
						<RefreshCw className="h-4 w-4 mr-2" />
						Refresh
					</Button>
				</div>

				<MonthlyTrendsChart data={data.monthlyTrends} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<CampaignCategoriesChart data={data.campaignCategories} />
					<DonorRetentionChart data={data.donorRetention} />
					<GeographicDistributionChart
						data={data.geographicData}
						className="md:col-span-2"
					/>
				</div>
			</div>
		</div>
	);
}
