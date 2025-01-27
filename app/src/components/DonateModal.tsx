"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCampaignService } from "@/services/campaign";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: "Amount must be a positive number",
	}),
	message: z.string().optional(),
});

interface DonateModalProps {
	campaignId: string;
	campaignTitle: string;
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export function DonateModal({
	campaignId,
	campaignTitle,
	isOpen,
	onClose,
	onSuccess,
}: DonateModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const campaignService = useCampaignService();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);
			await campaignService.donate(
				campaignId,
				Number(values.amount),
				values.message
			);

			toast({
				title: "Success",
				description: `Successfully donated ${values.amount} SOL to ${campaignTitle}`,
			});

			onSuccess?.();
			onClose();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message,
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Donate to {campaignTitle}</DialogTitle>
					<DialogDescription>
						Support this campaign by making a donation. All transactions are recorded
						on the Solana blockchain.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount (SOL)</FormLabel>
									<FormControl>
										<Input
											placeholder="0.0"
											{...field}
											type="number"
											step="0.01"
											min="0"
											disabled={isLoading}
										/>
									</FormControl>
									<FormDescription>
										Enter the amount you want to donate in SOL
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Leave a message of support..."
											className="resize-none"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormDescription>
										Your message will be visible to everyone
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{isLoading ? "Donating..." : "Donate"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
