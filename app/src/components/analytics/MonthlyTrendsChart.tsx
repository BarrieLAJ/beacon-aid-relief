import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Line,
	ComposedChart,
} from "recharts";
import type { MonthlyTrend } from "@/types/analytics";

interface Props {
	data: MonthlyTrend[];
}

export function MonthlyTrendsChart({ data }: Props) {
	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle>Monthly Trends</CardTitle>
				<CardDescription>Overview of donations and average amounts</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer>
						<ComposedChart data={data}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
							<XAxis
								dataKey="month"
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
							/>
							<YAxis
								yAxisId="left"
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
							/>
							<YAxis
								yAxisId="right"
								orientation="right"
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
							/>
							<Tooltip />
							<Legend />
							<Bar
								yAxisId="left"
								dataKey="totalDonations"
								name="Total Donations"
								fill="hsl(var(--primary))"
								radius={[4, 4, 0, 0]}
							/>
							<Line
								yAxisId="right"
								type="monotone"
								dataKey="avgDonationSize"
								name="Avg Donation Size"
								stroke="hsl(var(--secondary))"
								strokeWidth={2}
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
