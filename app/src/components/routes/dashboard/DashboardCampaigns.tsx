"use client";

import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignsTable } from "@/components/dashboard/CampaignsTable";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, RefreshCw } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";

export default function DashboardCampaigns() {
	const {
		data: campaigns = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useCampaigns();

	if (isLoading) {
		return (
			<DashboardLayout>
				<TableSkeleton columns={6} rows={4} />
			</DashboardLayout>
		);
	}

	if (isError) {
		return (
			<DashboardLayout>
				<Alert variant="destructive">
					<AlertDescription>
						Error loading campaigns: {error.message}
						<Button
							variant="outline"
							size="sm"
							className="ml-2"
							onClick={() => refetch()}
						>
							<RefreshCw className="h-4 w-4 mr-2" />
							Retry
						</Button>
					</AlertDescription>
				</Alert>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<CampaignsTable campaigns={campaigns} />
		</DashboardLayout>
	);
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { refetch } = useCampaigns();

	return (
		<div className="p-6 w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold">Campaigns</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={() => refetch()}>
						<RefreshCw className="h-4 w-4 mr-2" />
						Refresh
					</Button>
					<CreateCampaignDialog />
				</div>
			</div>
			{children}
		</div>
	);
}

function CreateCampaignDialog() {
	const { refetch } = useCampaigns();

	return (
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
				<CampaignForm onSuccess={() => refetch()} />
			</DialogContent>
		</Dialog>
	);
}
