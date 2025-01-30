"use client";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DonationsChart } from "@/components/dashboard/DonationsChart";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
	const { data, isLoading, isError, error, refetch } = useDashboardData();

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					Error loading dashboard data: {error.message}
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
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
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
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="mt-8">
					<StatsCards stats={data.stats} />
				</div>
				<div className="mt-8">
					<DonationsChart data={data.chartData} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
