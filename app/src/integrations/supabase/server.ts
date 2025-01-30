import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = "https://plcjtjchihvwcnxjtwdg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsY2p0amNoaWh2d2NueGp0d2RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NjIwMTcsImV4cCI6MjA1MjQzODAxN30.8viNv6koMji9FUKxHytO_P69GC-CcZ7w5WpC0Ik0PIY";
export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options)
					);
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	});
}
