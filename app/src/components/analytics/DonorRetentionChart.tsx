import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import type { DonorRetention } from "@/types/analytics";

export function DonorRetentionChart({ data }: { data: DonorRetention[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Donor Retention</CardTitle>
				<CardDescription>New vs Returning donors</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer>
						<LineChart data={data}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
							<XAxis
								dataKey="month"
								stroke="hsl(var(--muted-foreground))"
								fontSize={12}
							/>
							<YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
							<Tooltip />
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
	);
}
