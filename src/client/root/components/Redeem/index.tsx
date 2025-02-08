'use client'

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useMemo, useState } from "react"
import { PublicKey, Transaction, SystemProgram, type AccountInfo } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";
import { Snackbar, Typography } from "@mui/material";
import { formatUnits } from "ethers";
import { HelperAddress } from "@/app/config/constant";

const HELPER_ACCOUNT = new PublicKey(HelperAddress)


export function Redeem() {
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const [emptyAccounts, setEmptyAccounts] = useState<Readonly<{
        account: AccountInfo<Buffer>;
        pubkey: PublicKey;
    }>[]>([]);
    const [scanLoading, setScanLoading] = useState(false);
    const [showReclaimRes, setShowReclaimRes] = useState("");
    const [reclaimResMsg, setReclaimResMsg] = useState("");

    const scanEmptyAccount = useCallback(async () => {
        if (!publicKey) return;
        setScanLoading(true);
        connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID }).then(tokenAccounts => {
            if (tokenAccounts.value.length > 0) {
                const emptyAccounts: Readonly<{
                    account: AccountInfo<Buffer>;
                    pubkey: PublicKey;
                }>[] = [];
                tokenAccounts.value.map((item) => {
                    const { account } = item;
                    const amount = account.data.readBigUInt64LE(64);

                    if (amount === 0n) {
                        emptyAccounts.push(item)
                    }
                })
                if (emptyAccounts.length > 0) {
                    setEmptyAccounts(emptyAccounts)
                }
            }
        }).finally(() => {
            setScanLoading(false);
        })
    }, [connection, publicKey])

    useEffect(() => {
        scanEmptyAccount();
    }, [scanEmptyAccount])

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
            setReclaimResMsg("Transaction Successful")
        } catch (error) {
            const { message } = error as Error;
            setShowReclaimRes("fail");
            setReclaimResMsg("Transaction Failure: " + message);
        } finally {
            scanEmptyAccount()
        }
    }, [publicKey, emptyAccounts, connection, claimSol, sendTransaction, scanEmptyAccount])

    return (
        <div className="pt-6">
            <div className="flex flex-col items-center">
                <div className="lg:w-1/3 md:w-2/3 w-full">
                    <Typography variant="h1" align="center" classes={{ root: "!font-bold !text-4xl text-[#00A76F]" }}>
                        Reclaim your forgotten SOL
                    </Typography>
                </div>
                <WalletMultiButton style={{ backgroundColor: '#000', fontWeight: '500', height: '38px', borderRadius: '9999px', marginTop: '3rem' }} />
                <div className="flex flex-col items-center mt-10">
                    <div className="font-semibold text-3xl">{formatUnits(claimSol, 9)}
                        <span className="text-xs ml-1">SOL</span>
                    </div>
                </div>

                <Button variant="contained" size="large" onClick={closeAccount} disabled={claimSol === 0} className="my-4 md:w-2/3 w-5/6" classes={{ root: "!mt-2  !rounded-full" }}>{claimSol > 0 ? `Reclaim` : scanLoading ? `Scanning for Eligible Accounts` : `No Reclaimed SOL`}</Button>

                <div className="lg:w-2/3 md:w-full mt-10">
                    <Alert icon={false} variant="outlined" severity="info" classes={{ root: "flex items-center justify-center", message: "text-lg" }}>
                        <div className="text-center font-extrabold mb-2">How It Works</div>
                        <Typography variant="subtitle1" gutterBottom classes={{ root: "!mb-4" }}>
                            {`Connect Your Wallet: Simply click the "Connect" button, select your preferred Solana wallet and Redeem show you the total amount of Solana fees you have to claim.`}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {`Redeem Your Solana: Once the Redeem has complete a scan of your wallet, click the "Redeem" button to claim your Solana storage fees back to your wallet.`}
                        </Typography>
                    </Alert>
                </div>
            </div>
            <Snackbar open={showReclaimRes !== ""} autoHideDuration={6000} onClose={() => setShowReclaimRes("")}>
                <Alert severity={showReclaimRes === "success" ? "info" : "error"}>{reclaimResMsg}</Alert>
            </Snackbar>
        </div>
    )
}
