import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";

interface DonationsChartProps {
	data: Array<{ name: string; total: number }>;
}

export function DonationsChart({ data }: DonationsChartProps) {
	const chartConfig = {
		total: {
			theme: {
				light: "hsl(var(--primary))",
				dark: "hsl(var(--primary))",
			},
		},
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Donations Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ChartContainer config={chartConfig}>
						<RechartsBarChart data={data}>
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
	);
}
