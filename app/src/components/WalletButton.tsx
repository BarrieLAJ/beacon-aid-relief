"use client";

export const WalletButton = () => {
	return (
		//@ts-ignore
		<appkit-button
			label="Connect Wallet"
			balance="show"
			loadingLabel="Connecting..."
		/>
	);
};
