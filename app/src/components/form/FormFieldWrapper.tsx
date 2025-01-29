import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface FormFieldWrapperProps {
	form: UseFormReturn<any>;
	name: string;
	label: string;
	children: React.ReactNode;
}

export function FormFieldWrapper({
	form,
	name,
	label,
	children,
}: FormFieldWrapperProps) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>{children}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
