import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
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
			<body className={inter.className}>
				<Providers>
					<Navigation />
					{children}
				</Providers>
			</body>
		</html>
	);
}
