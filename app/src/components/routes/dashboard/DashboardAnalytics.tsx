"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Cell,
} from "recharts";

const DashboardAnalytics = () => {
	const monthlyTrends = [
		{ name: "Jan", donations: 4000, donors: 240 },
		{ name: "Feb", donations: 3000, donors: 198 },
		{ name: "Mar", donations: 2000, donors: 150 },
		{ name: "Apr", donations: 2780, donors: 189 },
		{ name: "May", donations: 1890, donors: 140 },
		{ name: "Jun", donations: 2390, donors: 170 },
	];

	// Campaign success rate by category
	const campaignCategories = [
		{ name: "Natural Disasters", value: 45 },
		{ name: "Medical Aid", value: 30 },
		{ name: "Infrastructure", value: 15 },
		{ name: "Education", value: 10 },
	];

	// Donor retention data
	const retentionData = [
		{ month: "Jan", newDonors: 120, returningDonors: 80 },
		{ month: "Feb", newDonors: 100, returningDonors: 90 },
		{ month: "Mar", newDonors: 80, returningDonors: 100 },
		{ month: "Apr", newDonors: 90, returningDonors: 110 },
		{ month: "May", newDonors: 85, returningDonors: 115 },
		{ month: "Jun", newDonors: 95, returningDonors: 120 },
	];

	// Geographic distribution
	const geographicData = [
		{ name: "North America", value: 40 },
		{ name: "Europe", value: 30 },
		{ name: "Asia", value: 20 },
		{ name: "Others", value: 10 },
	];

	const COLORS = [
		"hsl(var(--primary))",
		"hsl(var(--secondary))",
		"hsl(var(--accent))",
		"hsl(var(--muted))",
	];

	return (
		<div className="py-6 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="text-2xl font-semibold text-foreground mb-6">Analytics</h1>

				{/* Monthly Trends */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Monthly Donation Trends</CardTitle>
						<CardDescription>
							Overview of donations and donor count by month
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									data={monthlyTrends}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis
										dataKey="name"
										stroke="hsl(var(--muted-foreground))"
										fontSize={12}
									/>
									<YAxis
										yAxisId="left"
										stroke="hsl(var(--muted-foreground))"
										fontSize={12}
										tickFormatter={(value) => `$${value}`}
									/>
									<YAxis
										yAxisId="right"
										orientation="right"
										stroke="hsl(var(--muted-foreground))"
										fontSize={12}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "hsl(var(--background))",
											border: "1px solid hsl(var(--border))",
											borderRadius: "6px",
										}}
									/>
									<Legend />
									<Area
										yAxisId="left"
										type="monotone"
										dataKey="donations"
										name="Donations"
										stroke="hsl(var(--primary))"
										fill="hsl(var(--primary))"
										fillOpacity={0.2}
									/>
									<Area
										yAxisId="right"
										type="monotone"
										dataKey="donors"
										name="Donors"
										stroke="hsl(var(--secondary))"
										fill="hsl(var(--secondary))"
										fillOpacity={0.2}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Grid of smaller charts */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Campaign Categories */}
					<Card>
						<CardHeader>
							<CardTitle>Campaign Categories</CardTitle>
							<CardDescription>Distribution of campaigns by type</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={campaignCategories}
											dataKey="value"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={100}
											fill="hsl(var(--primary))"
											label
										>
											{campaignCategories.map((_entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--background))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "6px",
											}}
										/>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Donor Retention</CardTitle>
							<CardDescription>New vs Returning donors</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={retentionData}>
										<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
										<XAxis
											dataKey="month"
											stroke="hsl(var(--muted-foreground))"
											fontSize={12}
										/>
										<YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--background))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "6px",
											}}
										/>
										<Legend />
										<Line
											type="monotone"
											dataKey="newDonors"
											name="New Donors"
											stroke="hsl(var(--primary))"
											strokeWidth={2}
										/>
										<Line
											type="monotone"
											dataKey="returningDonors"
											name="Returning Donors"
											stroke="hsl(var(--secondary))"
											strokeWidth={2}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					{/* Geographic Distribution */}
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Geographic Distribution</CardTitle>
							<CardDescription>Donation distribution by region</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={geographicData} layout="vertical">
										<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
										<XAxis
											type="number"
											stroke="hsl(var(--muted-foreground))"
											fontSize={12}
										/>
										<YAxis
											dataKey="name"
											type="category"
											stroke="hsl(var(--muted-foreground))"
											fontSize={12}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--background))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "6px",
											}}
										/>
										<Bar
											dataKey="value"
											fill="hsl(var(--primary))"
											radius={[0, 4, 4, 0]}
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default DashboardAnalytics;
