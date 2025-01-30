import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import type { GeographicDistribution } from "@/types/analytics";

interface Props {
	data: GeographicDistribution[];
	className?: string;
}

export function GeographicDistributionChart({ data, className }: Props) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Geographic Distribution</CardTitle>
				<CardDescription>Donation distribution by region</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer>
						<BarChart data={data} layout="vertical">
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
							<Tooltip />
							<Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
