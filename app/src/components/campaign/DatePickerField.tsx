import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
	form: UseFormReturn<any>;
}

export function DatePickerField({ form }: DatePickerFieldProps) {
	return (
		<FormFieldWrapper form={form} name="end_date" label="End Date">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-full pl-3 text-left font-normal",
							!form.watch("end_date") && "text-muted-foreground"
						)}
					>
						{form.watch("end_date") ? (
							format(form.watch("end_date"), "PPP")
						) : (
							<span>Pick a date</span>
						)}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={form.watch("end_date")}
						onSelect={(date) => form.setValue("end_date", date)}
						disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</FormFieldWrapper>
	);
}
