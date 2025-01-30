import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";
import type { CategoryDistribution } from "@/types/analytics";

export function CampaignCategoriesChart({
	data,
}: {
	data: CategoryDistribution[];
}) {
	const COLORS = [
		"hsl(var(--primary))",
		"hsl(var(--secondary))",
		"hsl(var(--accent))",
		"hsl(var(--muted))",
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Campaign Categories</CardTitle>
				<CardDescription>Distribution of campaigns by type</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer>
						<PieChart>
							<Pie data={data} dataKey="value" nameKey="name" label>
								{data.map((_, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
