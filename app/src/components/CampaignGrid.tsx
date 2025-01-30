"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";
import Image from "next/image";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignGridProps {
	campaigns: Campaign[];
}

export function CampaignGrid({ campaigns }: CampaignGridProps) {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{campaigns.map((campaign) => (
				<Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
					<Card className="overflow-hidden hover:shadow-lg transition-shadow">
						{campaign.image_url && (
							<div className="relative h-48 w-full">
								<Image
									src={campaign.image_url}
									alt={campaign.title}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<CardHeader>
							<CardTitle>{campaign.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground line-clamp-2">
									{campaign.description}
								</p>
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>{formatCurrency(campaign.raised as number)}</span>
										<span>{formatCurrency(campaign.goal as number)}</span>
									</div>
									<Progress
										value={((campaign.raised as number) / campaign.goal) * 100}
									/>
								</div>
								{campaign.location && (
									<div className="text-sm text-muted-foreground">
										📍 {campaign.location}
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
}
