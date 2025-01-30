import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AuthProvider } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "BeaconAid - Blockchain-powered Disaster Relief",
	description:
		"Decentralized platform for emergency disaster relief fundraising",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn("min-h-screen bg-background antialiased", inter.className)}
			>
				<Providers>
					<AuthProvider>
						<Navigation />
						{children}
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
