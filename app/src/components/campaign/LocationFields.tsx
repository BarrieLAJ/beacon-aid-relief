/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { UseFormReturn } from "react-hook-form";

interface LocationFieldsProps {
	form: UseFormReturn<any>;
}

export function LocationFields({ form }: LocationFieldsProps) {
	return (
		<div className="space-y-4">
			<FormFieldWrapper form={form} name="category" label="Category">
				<Input
					placeholder="e.g., Natural Disaster, Medical"
					{...form.register("category")}
				/>
			</FormFieldWrapper>

			<FormFieldWrapper form={form} name="location" label="Location">
				<Input placeholder="City, Country" {...form.register("location")} />
			</FormFieldWrapper>
		</div>
	);
}
