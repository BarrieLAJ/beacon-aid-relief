/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WalletContextProvider } from "@/lib/wallet-context";
import { solanaWeb3JsAdapter } from "@/config";
import { solanaDevnet } from "@reown/appkit/networks";
import { solana } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit";
import { metadata } from "@/config";
import { solanaTestnet } from "@reown/appkit/networks";

const queryClient = new QueryClient();

const modal = createAppKit({
	projectId: "7a7dcda3aced505ed510a102aa0922ec",
	metadata: metadata,
	themeMode: "light",
	networks: [solana, solanaTestnet, solanaDevnet],
	adapters: [solanaWeb3JsAdapter],
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
	},
	themeVariables: {
		"--w3m-accent": "#0d9488",
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<WalletContextProvider>
					{children}
					<Toaster position="top-right" />
				</WalletContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
