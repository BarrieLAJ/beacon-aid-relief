"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BasicInfoFields } from "./campaign/BasicInfoFields";
import { LocationFields } from "./campaign/LocationFields";
import { DatePickerField } from "./campaign/DatePickerField";
import { FormFieldWrapper } from "./form/FormFieldWrapper";
import { useCampaignService } from "@/services/campaign";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	goal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: "Goal must be a positive number",
	}),
	category: z.string().min(1, "Category is required"),
	location: z.string().min(1, "Location is required"),
	end_date: z.date({
		required_error: "End date is required",
	}),
	image_url: z.string().optional(),
});

export function CampaignForm() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const campaignService = useCampaignService();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			goal: "",
			category: "",
			location: "",
			image_url: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);

			const result = await campaignService.createCampaign(
				values.title,
				values.description,
				Number(values.goal),
				values.end_date.getTime(),
				values.category,
				values.location,
				values.image_url
			);

			toast({
				title: "Success",
				description: `Campaign created successfully on Solana (${result.solanaAddress})`,
			});
			router.push("/dashboard/campaigns");
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<BasicInfoFields form={form} />
				<LocationFields form={form} />
				<DatePickerField form={form} />

				<FormFieldWrapper form={form} name="image_url" label="Image URL (Optional)">
					<Input placeholder="https://..." {...form.register("image_url")} />
				</FormFieldWrapper>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "Creating..." : "Create Campaign"}
				</Button>
			</form>
		</Form>
	);
}
