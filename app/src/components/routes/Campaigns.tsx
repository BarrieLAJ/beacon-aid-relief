"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Campaign = {
	id: number;
	title: string;
	description: string;
	raised: number;
	goal: number;
	image: string;
	category: string;
	location: string;
	daysLeft: number;
};

const campaigns: Campaign[] = [
	{
		id: 1,
		title: "Hurricane Relief Fund",
		description: "Emergency support for communities affected by Hurricane Ian",
		raised: 85000,
		goal: 100000,
		image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
		category: "Natural Disaster",
		location: "Florida, USA",
		daysLeft: 15,
	},
	{
		id: 2,
		title: "Earthquake Response",
		description: "Immediate assistance for earthquake victims in Turkey",
		raised: 120000,
		goal: 150000,
		image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
		category: "Natural Disaster",
		location: "Turkey",
		daysLeft: 20,
	},
	{
		id: 3,
		title: "Flood Recovery",
		description: "Help rebuild homes destroyed by severe flooding",
		raised: 45000,
		goal: 75000,
		image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
		category: "Natural Disaster",
		location: "Bangladesh",
		daysLeft: 30,
	},
	{
		id: 4,
		title: "Medical Supply Drive",
		description: "Providing essential medical supplies to affected areas",
		raised: 25000,
		goal: 50000,
		image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
		category: "Medical",
		location: "Global",
		daysLeft: 25,
	},
];

const Campaigns = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const router = useRouter();

	const filteredCampaigns = campaigns.filter((campaign) => {
		const matchesSearch = campaign.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			!selectedCategory || campaign.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const handleCardClick = (campaignId: number) => {
		router.push(`/campaigns/${campaignId}`);
	};

	return (
		<div className="container mx-auto px-4 py-8 pt-24">
			{/* Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Active Campaigns</h1>
				<p className="text-muted-foreground">
					Support ongoing disaster relief efforts around the world
				</p>
			</div>

			{/* Search and Filter */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<div className="relative flex-grow">
					<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search campaigns..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Button
					variant="outline"
					className="flex items-center gap-2"
					onClick={() => setSelectedCategory(null)}
				>
					<Filter className="h-4 w-4" />
					{selectedCategory || "All Categories"}
				</Button>
			</div>

			{/* Campaigns Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredCampaigns.map((campaign) => (
					<Card
						key={campaign.id}
						className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-[1.02] transition-transform duration-200"
						onClick={() => handleCardClick(campaign.id)}
					>
						<img
							src={campaign.image}
							alt={campaign.title}
							className="w-full h-48 object-cover rounded-t-lg"
						/>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-xl">{campaign.title}</CardTitle>
									<CardDescription>{campaign.location}</CardDescription>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										setSelectedCategory(campaign.category);
									}}
									className="text-xs"
								>
									{campaign.category}
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">{campaign.description}</p>
							<div className="space-y-2">
								<div className="h-2 bg-secondary rounded-full">
									<div
										className="h-full bg-beacon-600 rounded-full"
										style={{
											width: `${(campaign.raised / campaign.goal) * 100}%`,
										}}
									/>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-beacon-600 font-medium">
										${campaign.raised.toLocaleString()} raised
									</span>
									<span className="text-muted-foreground">
										of ${campaign.goal.toLocaleString()}
									</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<span className="text-sm text-muted-foreground">
								{campaign.daysLeft} days left
							</span>
							<Button
								className="bg-beacon-600 hover:bg-beacon-700"
								onClick={(e) => {
									e.stopPropagation();
									// Donation logic will be implemented later
								}}
							>
								Donate Now
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Campaigns;
