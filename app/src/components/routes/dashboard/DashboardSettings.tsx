"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DashboardSettings = () => {
	return (
		<div className="p-6 w-full">
			<Card>
				<CardHeader>
					<CardTitle>NGO Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="ngoName">NGO Name</Label>
							<Input id="ngoName" placeholder="Enter NGO name" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input id="email" type="email" placeholder="Enter email" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input id="phone" type="tel" placeholder="Enter phone number" />
						</div>
						<Button type="submit">Save Changes</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardSettings;
