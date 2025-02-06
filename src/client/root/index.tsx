'use client'

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Redeem } from "./components/Redeem";
import Image from "next/image";

export function Root() {
    return (
        <div>
            <header className="flex items-center justify-between py-2 px-4 mb-4 font-[family-name:var(--font-geist-mono)] border-b">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Solana" width={24} height={24} className='rounded-full' />
                    <span className='text-lg font-bold ml-2 text-[#00A76F]'>Earn SOL</span>
                </div>
                <WalletMultiButton style={{ backgroundColor: '#00A76F', padding: '0 1rem', height: '36px', fontWeight: '500' }} />
            </header>
            <main className="grid mx-4 h-[90vh]">
                <div className="bg-[#ecfaec] rounded-lg p-6">
                    <Redeem />
                </div>
            </main>
        </div>
    )
}
