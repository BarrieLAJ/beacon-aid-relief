import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Campaign } from "@/types/campaign";

interface CampaignsTableProps {
	campaigns: Campaign[];
}

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
	return (
		<Card>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Campaign</TableHead>
							<TableHead>Target</TableHead>
							<TableHead>Raised</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Donors</TableHead>
							<TableHead>Created</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{campaigns.map((campaign) => (
							<TableRow key={campaign.id}>
								<TableCell className="font-medium">{campaign.title}</TableCell>
								<TableCell>{formatCurrency(campaign.goal)}</TableCell>
								<TableCell>{formatCurrency(campaign.raised)}</TableCell>
								<TableCell>
									<CampaignStatus status={campaign.status} />
								</TableCell>
								<TableCell>{campaign.donors}</TableCell>
								<TableCell>{campaign.created}</TableCell>
							</TableRow>
						))}
						{campaigns.length === 0 && (
							<TableRow>
								<TableCell colSpan={6} className="text-center text-muted-foreground">
									No campaigns found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

function CampaignStatus({ status }: { status: Campaign["status"] }) {
	const statusStyles = {
		active: "bg-green-100 text-green-800",
		completed: "bg-gray-100 text-gray-800",
		cancelled: "bg-red-100 text-red-800",
	};

	return (
		<span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
