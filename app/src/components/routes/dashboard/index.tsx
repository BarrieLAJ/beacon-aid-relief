"use client";

import { Users, Heart, TrendingUp, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";

const Dashboard = () => {
	const stats = [
		{
			title: "Total Campaigns",
			value: "12",
			icon: Heart,
			change: "+2",
			changeType: "increase",
		},
		{
			title: "Total Raised",
			value: "$48,574",
			icon: TrendingUp,
			change: "+12.5%",
			changeType: "increase",
		},
		{
			title: "Active Donors",
			value: "2,345",
			icon: Users,
			change: "+18.2%",
			changeType: "increase",
		},
		{
			title: "Success Rate",
			value: "88%",
			icon: BarChart,
			change: "+5.4%",
			changeType: "increase",
		},
	];

	const chartData = [
		{ name: "Jan", total: 4000 },
		{ name: "Feb", total: 3000 },
		{ name: "Mar", total: 2000 },
		{ name: "Apr", total: 2780 },
		{ name: "May", total: 1890 },
		{ name: "Jun", total: 2390 },
	];

	const chartConfig = {
		total: {
			theme: {
				light: "hsl(var(--primary))",
				dark: "hsl(var(--primary))",
			},
		},
	};

	return (
		<div className="py-6 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				{/* Stats */}
				<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.title}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
								<stat.icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">
									<span
										className={
											stat.changeType === "increase" ? "text-green-600" : "text-red-600"
										}
									>
										{stat.change}
									</span>{" "}
									from last month
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Donations Chart */}
				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Donations Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ChartContainer config={chartConfig}>
								<RechartsBarChart data={chartData}>
									<XAxis
										dataKey="name"
										stroke="#888888"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke="#888888"
										fontSize={12}
										tickLine={false}
										axisLine={false}
										tickFormatter={(value) => `$${value}`}
									/>
									<Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} />
								</RechartsBarChart>
							</ChartContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
