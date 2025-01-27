"use client";

import { createContext, useContext, useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletContext = createContext({});

export function WalletContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// You can also provide a custom RPC endpoint
	const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			// Add other wallet adapters here
		],
		[]
	);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export const useWallet = () => {
	return useContext(WalletContext);
};
