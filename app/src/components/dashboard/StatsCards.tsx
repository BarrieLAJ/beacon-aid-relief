import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Heart, TrendingUp, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface StatsCardsProps {
	stats: {
		totalCampaigns: number;
		totalRaised: number;
		activeDonors: number;
		successRate: number;
	};
}

export function StatsCards({ stats }: StatsCardsProps) {
	const statsConfig = [
		{
			title: "Total Campaigns",
			value: stats.totalCampaigns.toString(),
			icon: Heart,
		},
		{
			title: "Total Raised",
			value: formatCurrency(stats.totalRaised),
			icon: TrendingUp,
		},
		{
			title: "Active Donors",
			value: stats.activeDonors.toString(),
			icon: Users,
		},
		{
			title: "Success Rate",
			value: `${Math.round(stats.successRate)}%`,
			icon: BarChart,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{statsConfig.map((stat) => (
				<Card key={stat.title}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
