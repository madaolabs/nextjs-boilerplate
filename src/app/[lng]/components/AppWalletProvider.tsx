'use client'

import { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";


// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { Endpoint } from "../../../config/constant";

export default function AppWalletProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const wallets = useMemo(
        () => [
            // if desired, manually define specific/custom wallets here (normally not required)
            // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
        ],
        [],
    );

    return (
        <ConnectionProvider endpoint={Endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {/* <WalletMultiButton /> */}
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
