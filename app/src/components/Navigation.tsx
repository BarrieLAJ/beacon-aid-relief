"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "./WalletButton";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const isAdminRoute = pathname.startsWith("/dashboard");

	// Navigation items for regular users (donors)
	const donorNavItems = [
		{ name: "Home", path: "/" },
		{ name: "Campaigns", path: "/campaigns" },
	];

	// Navigation items for admin dashboard
	const adminNavItems = [{ name: "Website", path: "/" }];

	const navItems = isAdminRoute ? adminNavItems : donorNavItems;
	const { isNgo } = useAuth();

	return (
		<nav className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
			<div className={`${!isAdminRoute ? "container mx-auto" : ""} px-4`}>
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center space-x-2">
						{!isAdminRoute ? (
							<span className="text-2xl font-bold text-beacon-600">BeaconAid</span>
						) : (
							<span className="text-2xl font-bold text-beacon-600">
								BeaconAid Admin Panel
							</span>
						)}
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className="text-foreground/80 hover:text-beacon-600 transition-colors"
							>
								{item.name}
							</Link>
						))}
						<WalletButton />
						{!isAdminRoute ? (
							!isNgo ? (
								<Link href="/auth/login">
									<Button variant="outline" className="flex items-center gap-2">
										<LogIn className="h-4 w-4" />
										NGO Login
									</Button>
								</Link>
							) : (
								<Link href="/dashboard">
									<Button variant="outline" className="flex items-center gap-2">
										Dashboard
									</Button>
								</Link>
							)
						) : null}
					</div>

					{/* Mobile Navigation Toggle */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				{isOpen && (
					<div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b slide-in">
						<div className="container mx-auto px-4 py-4 space-y-4">
							{navItems.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									className="block text-foreground/80 hover:text-beacon-600 transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</Link>
							))}
							<WalletButton />
							{!isAdminRoute && (
								<Link href="/auth/login" onClick={() => setIsOpen(false)}>
									<Button
										variant="outline"
										className="w-full flex items-center justify-center gap-2"
									>
										<LogIn className="h-4 w-4" />
										NGO Login
									</Button>
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
