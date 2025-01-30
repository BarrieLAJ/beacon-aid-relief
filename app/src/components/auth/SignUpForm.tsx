"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { useAppKitAccount } from "@reown/appkit/react";
import { WalletButton } from "../WalletButton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const NGO_TYPES = [
	"Humanitarian Aid",
	"Disaster Relief",
	"Education",
	"Healthcare",
	"Environmental",
	"Community Development",
	"Other",
];

export function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [organizationName, setOrganizationName] = useState("");
	const [organizationType, setOrganizationType] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { signUp } = useAuth();
	const { isConnected, address } = useAppKitAccount();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!isConnected || !address) {
			setError("Please connect your wallet first");
			return;
		}

		if (!organizationType) {
			setError("Please select an organization type");
			return;
		}

		setIsLoading(true);

		try {
			await signUp(email, password, {
				organization_name: organizationName,
				organization_type: organizationType,
				wallet_address: address,
			});
		} catch (error) {
			setError(error instanceof Error ? error.message : "Failed to sign up");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Register NGO</CardTitle>
				<CardDescription>
					Create an account to start managing campaigns
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<WalletButton />
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="text-sm font-medium">
							Password
						</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="organizationName" className="text-sm font-medium">
							Organization Name
						</label>
						<Input
							id="organizationName"
							value={organizationName}
							onChange={(e) => setOrganizationName(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="organizationType" className="text-sm font-medium">
							Organization Type
						</label>
						<Select value={organizationType} onValueChange={setOrganizationType}>
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
						<label className="text-sm font-medium">Wallet Address</label>
						<div className="rounded-md border p-3 text-sm">
							{isConnected ? address : "Please connect your wallet"}
						</div>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={isLoading || !isConnected}
					>
						{isLoading ? "Registering..." : "Register"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
