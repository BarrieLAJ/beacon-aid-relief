"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ListChecks, Settings, BarChart } from "lucide-react";

const DashboardLayout = (props: PropsWithChildren) => {
	const { children } = props;
	const router = useRouter();
	const pathname = usePathname();
	const [activeTab, setActiveTab] = useState("");

	useEffect(() => {
		const path = pathname.split("/dashboard/")[1] || "";
		setActiveTab(path);
	}, [pathname]);

	const handleNavigation = (path: string) => {
		router.push(path === "" ? "/dashboard" : `/dashboard/${path}`);
	};

	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<div className="hidden md:flex w-64 flex-col fixed h-full border-r bg-card">
				<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
					<nav className="mt-8 flex-1 px-2 space-y-1">
						<button
							onClick={() => handleNavigation("")}
							className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
								activeTab === ""
									? "bg-beacon-600 text-white"
									: "text-foreground hover:bg-muted"
							}`}
						>
							<LayoutDashboard className="mr-3 h-5 w-5" />
							Overview
						</button>
						<button
							onClick={() => handleNavigation("campaigns")}
							className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
								activeTab === "campaigns"
									? "bg-beacon-600 text-white"
									: "text-foreground hover:bg-muted"
							}`}
						>
							<ListChecks className="mr-3 h-5 w-5" />
							Campaigns
						</button>
						<button
							onClick={() => handleNavigation("analytics")}
							className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
								activeTab === "analytics"
									? "bg-beacon-600 text-white"
									: "text-foreground hover:bg-muted"
							}`}
						>
							<BarChart className="mr-3 h-5 w-5" />
							Analytics
						</button>
						<button
							onClick={() => handleNavigation("settings")}
							className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
								activeTab === "settings"
									? "bg-beacon-600 text-white"
									: "text-foreground hover:bg-muted"
							}`}
						>
							<Settings className="mr-3 h-5 w-5" />
							Settings
						</button>
					</nav>
				</div>
			</div>

			{/* Main content */}
			<div className="md:pl-64 flex flex-col flex-1 w-full">
				<main className="w-full">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
