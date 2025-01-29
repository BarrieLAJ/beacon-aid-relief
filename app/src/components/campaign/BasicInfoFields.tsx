import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFieldsProps {
	form: UseFormReturn<any>;
}

export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
	return (
		<div className="space-y-4">
			<FormFieldWrapper form={form} name="title" label="Title">
				<Input placeholder="Campaign title" {...form.register("title")} />
			</FormFieldWrapper>

			<FormFieldWrapper form={form} name="description" label="Description">
				<Textarea
					placeholder="Describe your campaign"
					className="resize-none"
					{...form.register("description")}
				/>
			</FormFieldWrapper>

			<FormFieldWrapper form={form} name="goal" label="Fundraising Goal ($)">
				<Input
					type="number"
					placeholder="Enter amount"
					{...form.register("goal")}
				/>
			</FormFieldWrapper>
		</div>
	);
}
