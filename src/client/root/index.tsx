'use client'

import { Redeem } from "./components/Redeem";
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/X';
import Image from "next/image";

export function Root() {
    return (
        <div>
            <header className="flex items-center justify-between py-2 sm:px-4 lg:px-48  mb-4 border-b">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Solana" width={40} height={40} className='rounded-full' />
                    <span className='text-2xl font-medium ml-2 text-[#00A76F]'>Earn SOL</span>
                </div>
                <IconButton href="https://x.com/EpochXNetwork" color="primary" target="_blank">
                    <XIcon />
                </IconButton>

            </header>
            <main className="grid mx-4 h-[90vh]">
                <div className="bg-[#ecfaec] rounded-lg p-6">
                    <Redeem />
                </div>
            </main>
        </div>
    )
}
