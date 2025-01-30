import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/integrations/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/(dashboard)/dashboard";

	if (token_hash && type) {
		const supabase = createClient();

		const { error } = await (
			await supabase
		).auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			redirect(next);
		}
	}

	// Return the user to an error page with some instructions
	redirect("/auth/error");
}
