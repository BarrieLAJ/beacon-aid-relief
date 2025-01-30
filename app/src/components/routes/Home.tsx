"use client";

import { Heart, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

const fetchFeaturedCampaigns = async () => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("campaigns")
		.select("*")
		.eq("status", "active")
		.order("created_at", { ascending: false })
		.limit(6);

	if (error) {
		throw error;
	}

	return data || [];
};

const HomePage = () => {
	const {
		data: featuredCampaigns = [],
		isLoading,
		error,
	} = useQuery<Campaign[]>({
		queryKey: ["featuredCampaigns"],
		queryFn: fetchFeaturedCampaigns,
	});

	// Keep stats static as requested
	const stats = [
		{ label: "Active Campaigns", value: "150+", icon: Heart },
		{ label: "People Helped", value: "50,000+", icon: Users },
		{ label: "Secure Transactions", value: "100%", icon: Shield },
	];

	return (
		<div className="min-h-screen pt-16">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto text-center space-y-8">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight fade-in">
						Empowering Disaster Relief Through
						<span className="text-beacon-600"> Blockchain</span>
					</h1>
					<p className="text-xl text-muted-foreground fade-in">
						Join our decentralized platform to make emergency disaster relief more
						transparent, efficient, and accessible to those who need it most.
					</p>
					<div className="flex flex-wrap justify-center gap-4 fade-in">
						<Link href="/dashboard">
							<Button size="lg" className="bg-beacon-600 hover:bg-beacon-700">
								Start a Campaign
							</Button>
						</Link>
						<Link href="/campaigns">
							<Button size="lg" variant="outline">
								Explore Campaigns
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-beacon-50 py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="glass-card p-6 rounded-lg text-center hover-lift"
							>
								<stat.icon className="w-12 h-12 mx-auto mb-4 text-beacon-600" />
								<div className="text-3xl font-bold mb-2">{stat.value}</div>
								<div className="text-muted-foreground">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Campaigns */}
			<section className="container mx-auto px-4 py-20">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Featured Campaigns</h2>
					<p className="text-muted-foreground">Join these active relief efforts</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading skeletons
						[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="glass-card rounded-lg overflow-hidden animate-pulse"
							>
								<div className="w-full h-48 bg-gray-200" />
								<div className="p-6 space-y-4">
									<div className="h-6 bg-gray-200 rounded w-3/4" />
									<div className="h-4 bg-gray-200 rounded w-full" />
									<div className="h-2 bg-gray-200 rounded-full w-full" />
									<div className="flex justify-between">
										<div className="h-4 bg-gray-200 rounded w-1/4" />
										<div className="h-4 bg-gray-200 rounded w-1/4" />
									</div>
								</div>
							</div>
						))
					) : error ? (
						<div className="col-span-3 text-center py-12">
							<div className="space-y-4">
								<p className="text-lg text-muted-foreground">
									Unable to load campaigns at the moment
								</p>
								<p className="text-sm text-muted-foreground">Please try again later</p>
								<Button
									variant="outline"
									className="mt-4"
									onClick={() => window.location.reload()}
								>
									Retry <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					) : featuredCampaigns.length > 0 ? (
						featuredCampaigns.map((campaign) => (
							<div
								key={campaign.id}
								className="glass-card rounded-lg overflow-hidden hover-lift"
							>
								<Image
									src={campaign.image_url || "/placeholder.svg"}
									width={300}
									height={300}
									alt={campaign.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
									<p className="text-muted-foreground mb-4">{campaign.description}</p>
									<div className="mb-4">
										<div className="h-2 bg-beacon-100 rounded-full">
											<div
												className="h-full bg-beacon-600 rounded-full"
												style={{
													width: `${((campaign.raised || 0) / campaign.goal) * 100}%`,
												}}
											/>
										</div>
										<div className="flex justify-between mt-2 text-sm">
											<span>${(campaign.raised || 0).toLocaleString()} raised</span>
											<span>${campaign.goal.toLocaleString()} goal</span>
										</div>
									</div>
									<Link
										href={`/campaigns/${campaign.id}`}
										className="inline-flex items-center text-beacon-600 hover:text-beacon-700"
									>
										View Campaign <ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</div>
							</div>
						))
					) : (
						<div className="col-span-3 text-center py-12">
							<div className="space-y-4">
								<p className="text-lg text-muted-foreground">
									No active campaigns available at the moment
								</p>
								<p className="text-sm text-muted-foreground">
									Be the first to start a campaign and make a difference!
								</p>
								<Link href="/dashboard">
									<Button variant="outline" className="mt-4">
										Start a Campaign <ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default HomePage;
