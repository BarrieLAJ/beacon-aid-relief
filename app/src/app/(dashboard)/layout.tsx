import DashboardLayout2 from "@/components/DashboardLayout";
import { createClient } from "@/integrations/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect("/auth/login");
	}
	return (
		<DashboardLayout2>
			<div className="flex h-[calc(100vh-4rem)] w-full bg-background">
				{children}
			</div>
		</DashboardLayout2>
	);
}
