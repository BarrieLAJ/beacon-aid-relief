"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const NGO_TYPES = [
	"Humanitarian Aid",
	"Disaster Relief",
	"Education",
	"Healthcare",
	"Environmental",
	"Community Development",
	"Other",
];

const DashboardSettings = () => {
	const { user, updateProfile } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		organization_name: "",
		organization_type: "",
		email: "",
		wallet_address: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				organization_name: user.user_metadata.organization_name || "",
				organization_type: user.user_metadata.organization_type || "",
				email: user.email || "",
				wallet_address: user.user_metadata.wallet_address || "",
			});
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await updateProfile({
				organization_name: formData.organization_name,
				organization_type: formData.organization_type,
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update profile");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-6 w-full">
			<Card>
				<CardHeader>
					<CardTitle>NGO Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="space-y-2">
							<Label htmlFor="organization_name">NGO Name</Label>
							<Input
								id="organization_name"
								value={formData.organization_name}
								onChange={(e) =>
									setFormData({ ...formData, organization_name: e.target.value })
								}
								placeholder="Enter NGO name"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="organization_type">Organization Type</Label>
							<Select
								value={formData.organization_type}
								onValueChange={(value) =>
									setFormData({ ...formData, organization_type: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select organization type" />
								</SelectTrigger>
								<SelectContent>
									{NGO_TYPES.map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								disabled
								className="bg-muted"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="wallet_address">Wallet Address</Label>
							<Input
								id="wallet_address"
								value={formData.wallet_address}
								disabled
								className="bg-muted font-mono text-sm"
							/>
						</div>

						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save Changes"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardSettings;
