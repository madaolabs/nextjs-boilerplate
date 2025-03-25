'use client'

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useMemo, useState } from "react"
import { PublicKey, Transaction, SystemProgram, type AccountInfo } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";
import { Alert, Snackbar } from "@mui/material";
import { formatUnits } from "ethers";
import { HelperAddress } from "@/config/constant";
import { getDictionary } from "@/i18n";
import Logo from '@/assets/logo.svg'

const HELPER_ACCOUNT = new PublicKey(HelperAddress)



const WalletIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-40 h-32 mx-auto mb-4">
        <rect x="20" y="40" width="160" height="100" rx="10" fill="#6366f1" />
        <rect x="20" y="40" width="160" height="80" rx="10" fill="#818cf8" />
        <rect x="40" y="20" width="120" height="90" rx="10" fill="#a5b4fc" />
        <circle cx="150" cy="80" r="15" fill="#fef3c7" />
        <circle cx="150" cy="80" r="8" fill="#fcd34d" />
        <rect x="60" y="60" width="60" height="10" rx="5" fill="#f9fafb" />
        <rect x="60" y="80" width="40" height="10" rx="5" fill="#f9fafb" />
    </svg>
);


export function Redeem({ lng }: { lng: string }) {

    const { publicKey, sendTransaction, connecting, disconnect } = useWallet()
    const t = getDictionary(lng);
    const { connection } = useConnection()
    const [emptyAccounts, setEmptyAccounts] = useState<{
        account: AccountInfo<Buffer>;
        pubkey: PublicKey;
    }[]>([]);
    const [showReclaimRes, setShowReclaimRes] = useState("");


    const scanEmptyAccount = useCallback(async () => {
        if (!publicKey) return;
        try {
            const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });

            const emptyAccounts: {
                account: AccountInfo<Buffer>;
                pubkey: PublicKey;
            }[] = [];
            tokenAccounts.value?.map((item) => {
                const { account } = item;
                const amount = account.data.readBigUInt64LE(64);

                if (amount === 0n) {
                    emptyAccounts.push(item)
                }
            })

            setEmptyAccounts(emptyAccounts)

        } catch (error) {
            console.error("scan error:", error);
        }


    }, [connection, publicKey])

    useEffect(() => {
        scanEmptyAccount();
    }, [scanEmptyAccount, publicKey])

    const claimSol = useMemo(() => {
        return emptyAccounts.reduce((prev, item) => { return item.account.lamports + prev }, 0);
    }, [emptyAccounts])



    const closeAccount = useCallback(async () => {
        if (!publicKey) return;
        const tx = new Transaction();
        emptyAccounts.forEach(({ pubkey: tokenAccountPubKey }) => {
            tx.add(
                createCloseAccountInstruction(
                    tokenAccountPubKey, // token account which you want to close
                    publicKey, // destination
                    publicKey, // owner of token account
                ),
            );
        })
        tx.add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: HELPER_ACCOUNT,
                lamports: BigInt(Math.fround(claimSol * 0.1))
            })
        )

        try {
            const txhash = await sendTransaction(tx, connection);
            console.log("txhash===>", txhash);

            setShowReclaimRes("success");
        } catch (error) {
            const { message } = error as Error;
            setShowReclaimRes("fail");
            console.error('failed===>', message);

        } finally {
            const timer = setTimeout(async () => {
                await scanEmptyAccount()
                clearTimeout(timer)
            }, 3000)
        }
    }, [publicKey, emptyAccounts, connection, claimSol, sendTransaction, scanEmptyAccount])



    const renderRedeemButton = () => {
        if (claimSol > 0) {
            return (
                <button
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center mt-6 m-auto"
                    onClick={closeAccount}
                    disabled={connecting}
                >
                    {connecting ? t.processing : t.redeem}
                </button>
            );
        }
        return <p className="text-red-500 mt-6 font-medium">{t?.['insufficientRedemption']}</p>;
    };

    // 渲染连接钱包按钮
    const renderConnectWalletButton = () => (
        <div className="flex items-center justify-center space-x-2">
            {connecting ?
                <span>{t?.['connecting']}</span> :
                <>

                    <WalletMultiButton startIcon={<span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    </span>} disabled={connecting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105" />
                </>
            }
        </div>
    );



    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10 border border-indigo-100">
            <div className="text-center mb-8">
                <div className="flex justify-center">
                    <Logo className="w-20" />
                </div>
                <h1 className="text-3xl font-bold text-indigo-800 mb-2">{t?.['title']}</h1>
                <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {!publicKey ? (
                <div className="text-center flex flex-col justify-center">
                    <WalletIllustration />
                    <p className="mb-6 text-gray-600">{t?.['connectPrompt']}</p>
                    {renderConnectWalletButton()}
                </div>
            ) : (
                <div className="text-center">
                    <div className="bg-indigo-50 rounded-xl p-4 mb-6 border border-indigo-100">
                        <p className="text-sm text-indigo-600 font-medium mb-1">{t?.['walletAddress']}</p>
                        <div className="bg-white rounded-lg p-2 break-all font-mono text-xs text-gray-700">
                            {publicKey.toBase58()}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border border-indigo-100 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-16 h-16 opacity-10">
                            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="15" fill="#4f46e5" />
                            </svg>
                        </div>

                        <p className="text-sm text-indigo-600 font-medium mb-1">{t?.['redeemableSOL']}</p>
                        <p className="text-3xl font-bold text-indigo-800">
                            {connecting ?
                                t.loading :
                                `${formatUnits(claimSol, 9)} SOL`
                            }
                        </p>
                    </div>

                    {renderRedeemButton()}

                    <button
                        className="text-indigo-500 hover:text-indigo-700 text-sm mt-6 flex items-center mx-auto"
                        onClick={() => {
                            disconnect()
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t?.['disconnectWallet']}
                    </button>
                </div>
            )}
            <Snackbar open={showReclaimRes !== ""} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => setShowReclaimRes("")}>
                <Alert severity={showReclaimRes === "success" ? "info" : "error"}>{showReclaimRes === "success" ? t.txSuccess : t.txFailed}</Alert>
            </Snackbar>
        </div>
    )
}
