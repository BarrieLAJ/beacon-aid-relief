import { useMemo } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type DbDonation = Database["public"]["Tables"]["donations"]["Row"];
type Donation = DbDonation & { donor_id: string };

interface DonationHistoryProps {
	donations: Donation[];
	maxHeight?: string;
	isLoading?: boolean;
}

export function DonationHistory({
	donations,
	maxHeight = "300px",
	isLoading = false,
}: DonationHistoryProps) {
	const sortedDonations = useMemo(() => {
		return [...donations].sort(
			(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);
	}, [donations]);

	if (isLoading) {
		return (
			<ScrollArea className="rounded-md border" style={{ maxHeight }}>
				<div className="space-y-4 p-4">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="flex items-start space-x-4">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-3 w-full" />
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		);
	}

	return (
		<ScrollArea className="rounded-md border" style={{ maxHeight }}>
			<div className="space-y-4 p-4">
				{sortedDonations.length === 0 ? (
					<p className="text-center text-sm text-gray-500">No donations yet</p>
				) : (
					sortedDonations.map((donation) => (
						<div key={donation.id} className="flex items-start space-x-4">
							<Avatar>
								<div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
									{donation.donor_id.slice(0, 2).toUpperCase()}
								</div>
							</Avatar>
							<div className="flex-1 space-y-1">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium">
										{(donation.amount / LAMPORTS_PER_SOL).toFixed(2)} SOL
									</p>
									<span className="text-xs text-gray-500">
										{formatDistanceToNow(new Date(donation.created_at), {
											addSuffix: true,
										})}
									</span>
								</div>
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
