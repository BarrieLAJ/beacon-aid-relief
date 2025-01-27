import { useMemo } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";

interface Donation {
	amount: number;
	donor_id: string;
	message: string | null;
	created_at: string;
}

interface DonationHistoryProps {
	donations: Donation[];
	maxHeight?: string;
}

export function DonationHistory({
	donations,
	maxHeight = "300px",
}: DonationHistoryProps) {
	const sortedDonations = useMemo(() => {
		return [...donations].sort(
			(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);
	}, [donations]);

	return (
		<ScrollArea className="rounded-md border" style={{ maxHeight }}>
			<div className="space-y-4 p-4">
				{sortedDonations.length === 0 ? (
					<p className="text-center text-sm text-gray-500">No donations yet</p>
				) : (
					sortedDonations.map((donation, index) => (
						<div key={index} className="flex items-start space-x-4">
							<Avatar>
								<div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
									{donation.donor_id.slice(0, 2).toUpperCase()}
								</div>
							</Avatar>
							<div className="flex-1 space-y-1">
								<p className="text-sm font-medium">
									{(donation.amount / LAMPORTS_PER_SOL).toFixed(2)} SOL
									<span className="ml-2 text-xs text-gray-500">
										{formatDistanceToNow(new Date(donation.created_at), {
											addSuffix: true,
										})}
									</span>
								</p>
								{donation.message && (
									<p className="text-sm text-gray-500">{donation.message}</p>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</ScrollArea>
	);
}
