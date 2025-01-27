"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, AlertCircle, Share2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppKitAccount } from "@reown/appkit/react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DonateModal } from "@/components/DonateModal";

// Mock data - replace with actual data fetching
const campaignData = {
	id: "1",
	title: "Hurricane Relief Fund",
	description:
		"Support communities affected by the recent hurricane in coastal regions. The devastating Category 4 hurricane has left thousands without homes and basic necessities. Your contribution will help provide emergency shelter, food, clean water, and medical supplies to affected families.",
	location: "Florida, USA",
	targetAmount: 100,
	raisedAmount: 65.5,
	endDate: new Date("2024-04-01"),
	status: "active" as const,
	donors: 128,
	updates: [
		{
			date: "2024-03-15",
			title: "Emergency Supplies Distributed",
			content:
				"Successfully distributed emergency supplies to 200 families in the affected area. Supplies included water, food, and basic medical kits.",
		},
		{
			date: "2024-03-10",
			title: "First Response Team Deployed",
			content:
				"Our first response team has been deployed to the affected areas. Initial assessment of damage and immediate needs completed.",
		},
	],
	images: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
};

export default function CampaignDetailsPage() {
	const { isConnected } = useAppKitAccount();
	const progress = (campaignData.raisedAmount / campaignData.targetAmount) * 100;
	const [showDonateModal, setShowDonateModal] = useState(false);

	const handleDonate = () => {
		if (!isConnected) {
			return; // Button will be disabled anyway
		}
		setShowDonateModal(true);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{!isConnected && (
				<Alert variant="destructive" className="mb-6">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Wallet Not Connected</AlertTitle>
					<AlertDescription>
						Please connect your wallet to donate to this campaign.
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<div>
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-3xl font-bold tracking-tight">
								{campaignData.title}
							</h1>
							<Badge
								variant={campaignData.status === "active" ? "default" : "destructive"}
							>
								{campaignData.status.charAt(0).toUpperCase() +
									campaignData.status.slice(1)}
							</Badge>
						</div>
						<div className="flex items-center space-x-4 text-muted-foreground mb-4">
							<div className="flex items-center">
								<MapPin className="h-4 w-4 mr-1" />
								<span>{campaignData.location}</span>
							</div>
							<div className="flex items-center">
								<CalendarDays className="h-4 w-4 mr-1" />
								<span>Ends {campaignData.endDate.toLocaleDateString()}</span>
							</div>
							<div className="flex items-center">
								<Users className="h-4 w-4 mr-1" />
								<span>{campaignData.donors} donors</span>
							</div>
						</div>
					</div>

					<div className="aspect-video relative rounded-lg overflow-hidden">
						<img
							src={campaignData.images[0]}
							alt={campaignData.title}
							className="object-cover w-full h-full"
						/>
					</div>

					<Tabs defaultValue="about" className="space-y-4">
						<TabsList>
							<TabsTrigger value="about">About</TabsTrigger>
							<TabsTrigger value="updates">Updates</TabsTrigger>
							<TabsTrigger value="donors">Donors</TabsTrigger>
						</TabsList>

						<TabsContent value="about" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<p className="text-muted-foreground whitespace-pre-line">
										{campaignData.description}
									</p>
								</CardContent>
							</Card>

							<div className="grid grid-cols-2 gap-4">
								{campaignData.images.map((image, index) => (
									<div key={index} className="aspect-video rounded-lg overflow-hidden">
										<img
											src={image}
											alt={`Campaign image ${index + 1}`}
											className="object-cover w-full h-full"
										/>
									</div>
								))}
							</div>
						</TabsContent>

						<TabsContent value="updates" className="space-y-4">
							{campaignData.updates.map((update, index) => (
								<Card key={index}>
									<CardContent className="pt-6">
										<div className="flex justify-between items-start mb-2">
											<h3 className="font-semibold">{update.title}</h3>
											<span className="text-sm text-muted-foreground">{update.date}</span>
										</div>
										<p className="text-muted-foreground">{update.content}</p>
									</CardContent>
								</Card>
							))}
						</TabsContent>

						<TabsContent value="donors" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<p className="text-center text-muted-foreground">
										Donor list will be displayed here.
									</p>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					<Card>
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Progress</span>
										<span>{Math.round(progress)}%</span>
									</div>
									<Progress value={progress} className="h-2" />
									<div className="flex justify-between text-sm text-muted-foreground">
										<span>{campaignData.raisedAmount.toFixed(2)} SOL raised</span>
										<span>Target: {campaignData.targetAmount.toFixed(2)} SOL</span>
									</div>
								</div>

								<Separator />

								<div className="space-y-4">
									<Button
										className="w-full"
										size="lg"
										disabled={!isConnected}
										onClick={handleDonate}
									>
										Donate Now
									</Button>
									<Button variant="outline" className="w-full" size="lg">
										<Share2 className="mr-2 h-4 w-4" />
										Share
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<h3 className="font-semibold mb-2">About the Organizer</h3>
							<p className="text-sm text-muted-foreground">
								This campaign is organized by a verified disaster relief organization.
								Contact information and verification details will be displayed here.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<DonateModal
				campaignId={campaignData.id}
				campaignTitle={campaignData.title}
				isOpen={showDonateModal}
				onClose={() => setShowDonateModal(false)}
				onSuccess={() => {
					// Optionally refresh campaign data here
				}}
			/>
		</div>
	);
}
