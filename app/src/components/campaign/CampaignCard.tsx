import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { DonateButton } from "../DonateButton";
import { DonationHistory } from "./DonationHistory";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Donation {
	amount: number;
	donor_id: string;
	message: string | null;
	created_at: string;
}

interface CampaignCardProps {
	id: string;
	title: string;
	description: string;
	goal: number;
	raised: number;
	imageUrl?: string | null;
	donations: Donation[];
	onDonationSuccess?: () => void;
}

export function CampaignCard({
	id,
	title,
	description,
	goal,
	raised,
	imageUrl,
	donations,
	onDonationSuccess,
}: CampaignCardProps) {
	const [showDonations, setShowDonations] = useState(false);
	const progress = (raised / goal) * 100;
	const goalInSol = goal / LAMPORTS_PER_SOL;
	const raisedInSol = raised / LAMPORTS_PER_SOL;
	const donationCount = donations.length;

	return (
		<>
			<Card className="overflow-hidden">
				{imageUrl && (
					<div className="aspect-video w-full overflow-hidden">
						<img src={imageUrl} alt={title} className="h-full w-full object-cover" />
					</div>
				)}

				<CardHeader>
					<h3 className="text-2xl font-semibold">{title}</h3>
					<p className="text-sm text-gray-500">{description}</p>
				</CardHeader>

				<CardContent>
					<div className="space-y-4">
						<Progress value={progress} className="h-2" />

						<div className="flex justify-between text-sm">
							<div>
								<p className="font-medium">{raisedInSol.toFixed(2)} SOL</p>
								<p className="text-gray-500">raised</p>
							</div>
							<div className="text-center">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowDonations(true)}
									className="h-auto p-0"
								>
									<p className="font-medium">{donationCount}</p>
									<p className="text-gray-500">
										{donationCount === 1 ? "donor" : "donors"}
									</p>
								</Button>
							</div>
							<div className="text-right">
								<p className="font-medium">{goalInSol.toFixed(2)} SOL</p>
								<p className="text-gray-500">goal</p>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter>
					<DonateButton
						campaignId={id}
						campaignTitle={title}
						onSuccess={onDonationSuccess}
					/>
				</CardFooter>
			</Card>

			<Dialog open={showDonations} onOpenChange={setShowDonations}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Donations to {title}</DialogTitle>
					</DialogHeader>
					<DonationHistory donations={donations} />
				</DialogContent>
			</Dialog>
		</>
	);
}
