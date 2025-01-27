import DashboardLayout2 from "@/components/DashboardLayout";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<DashboardLayout2>
			<div className="flex h-[calc(100vh-4rem)] w-full bg-background">
				{children}
			</div>
		</DashboardLayout2>
	);
}
