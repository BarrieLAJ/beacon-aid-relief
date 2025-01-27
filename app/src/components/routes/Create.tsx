"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignForm } from "@/components/CampaignForm";

const Create = () => {
	return (
		<div className="container max-w-2xl py-16">
			<Card>
				<CardHeader>
					<CardTitle>Create Campaign</CardTitle>
				</CardHeader>
				<CardContent>
					<CampaignForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default Create;
