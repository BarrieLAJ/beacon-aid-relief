"use client";

import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CampaignForm } from "@/components/CampaignForm";

const DashboardCampaigns = () => {
	const campaigns = [
		{
			id: 1,
			title: "Emergency Flood Relief",
			target: "$50,000",
			raised: "$32,450",
			status: "Active",
			donors: 245,
			created: "2024-02-15",
		},
		{
			id: 2,
			title: "Earthquake Response Fund",
			target: "$100,000",
			raised: "$78,900",
			status: "Active",
			donors: 523,
			created: "2024-02-10",
		},
		{
			id: 3,
			title: "Hurricane Recovery",
			target: "$75,000",
			raised: "$75,000",
			status: "Completed",
			donors: 412,
			created: "2024-01-20",
		},
		{
			id: 4,
			title: "Wildfire Relief",
			target: "$25,000",
			raised: "$12,345",
			status: "Active",
			donors: 98,
			created: "2024-02-01",
		},
	];

	return (
		<div className="p-6 w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold">Campaigns</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<PlusCircle className="mr-2 h-4 w-4" />
							Create Campaign
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<DialogTitle>Create New Campaign</DialogTitle>
						</DialogHeader>
						<CampaignForm />
					</DialogContent>
				</Dialog>
			</div>

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
									<TableCell>{campaign.target}</TableCell>
									<TableCell>{campaign.raised}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												campaign.status === "Active"
													? "bg-green-100 text-green-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{campaign.status}
										</span>
									</TableCell>
									<TableCell>{campaign.donors}</TableCell>
									<TableCell>{campaign.created}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardCampaigns;
