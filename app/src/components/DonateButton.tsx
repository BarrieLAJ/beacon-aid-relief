import { useState } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useCampaignService } from "@/services/campaign";
import { useToast } from "./ui/use-toast";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Alert, AlertDescription } from "./ui/alert";

interface DonateButtonProps {
	campaignId: string;
	campaignTitle: string;
	onSuccess?: () => void;
}

const MIN_AMOUNT = 0.01; // Minimum 0.01 SOL
const MAX_AMOUNT = 100; // Maximum 100 SOL

export function DonateButton({
	campaignId,
	campaignTitle,
	onSuccess,
}: DonateButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const campaignService = useCampaignService();
	const { toast } = useToast();

	const validateAmount = (value: string) => {
		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			return "Please enter a valid amount";
		}
		if (numValue < MIN_AMOUNT) {
			return `Minimum donation is ${MIN_AMOUNT} SOL`;
		}
		if (numValue > MAX_AMOUNT) {
			return `Maximum donation is ${MAX_AMOUNT} SOL`;
		}
		return null;
	};

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAmount(value);
		setError(validateAmount(value));
	};

	const handleProceed = () => {
		const validationError = validateAmount(amount);
		if (validationError) {
			setError(validationError);
			return;
		}
		setShowConfirmation(true);
	};

	const handleDonate = async () => {
		try {
			setIsLoading(true);
			const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

			await campaignService.donate(campaignId, lamports, message);

			toast({
				title: "Donation successful!",
				description: `You donated ${amount} SOL to ${campaignTitle}`,
			});

			setIsOpen(false);
			setAmount("");
			setMessage("");
			setShowConfirmation(false);
			onSuccess?.();
		} catch (error) {
			toast({
				title: "Donation failed",
				description: error instanceof Error ? error.message : "Please try again",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setAmount("");
		setMessage("");
		setError(null);
		setShowConfirmation(false);
	};

	return (
		<>
			<Button onClick={() => setIsOpen(true)} size="lg">
				Donate Now
			</Button>

			<Dialog open={isOpen} onOpenChange={handleClose}>
				<DialogContent>
					{!showConfirmation ? (
						<>
							<DialogHeader>
								<DialogTitle>Donate to {campaignTitle}</DialogTitle>
								<DialogDescription>
									Support this campaign with a donation between {MIN_AMOUNT} and{" "}
									{MAX_AMOUNT} SOL
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<label htmlFor="amount" className="text-sm font-medium">
										Amount (SOL)
									</label>
									<Input
										id="amount"
										type="number"
										step="0.01"
										min={MIN_AMOUNT}
										max={MAX_AMOUNT}
										placeholder="0.00"
										value={amount}
										onChange={handleAmountChange}
									/>
									{error && (
										<Alert variant="destructive">
											<AlertDescription>{error}</AlertDescription>
										</Alert>
									)}
								</div>

								<div className="space-y-2">
									<label htmlFor="message" className="text-sm font-medium">
										Message (optional)
									</label>
									<Textarea
										id="message"
										placeholder="Add a message of support..."
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
								</div>

								<Button
									onClick={handleProceed}
									disabled={!amount || !!error}
									className="w-full"
								>
									Continue
								</Button>
							</div>
						</>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>Confirm Donation</DialogTitle>
							</DialogHeader>

							<div className="space-y-4 py-4">
								<div className="rounded-lg bg-muted p-4">
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-sm text-muted-foreground">Amount:</span>
											<span className="font-medium">{amount} SOL</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-muted-foreground">Campaign:</span>
											<span className="font-medium">{campaignTitle}</span>
										</div>
										{message && (
											<div className="pt-2">
												<span className="text-sm text-muted-foreground">Message:</span>
												<p className="mt-1 text-sm">{message}</p>
											</div>
										)}
									</div>
								</div>
							</div>

							<DialogFooter className="gap-2 sm:gap-0">
								<Button
									variant="outline"
									onClick={() => setShowConfirmation(false)}
									disabled={isLoading}
								>
									Back
								</Button>
								<Button onClick={handleDonate} disabled={isLoading}>
									{isLoading ? "Processing..." : "Confirm Donation"}
								</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
