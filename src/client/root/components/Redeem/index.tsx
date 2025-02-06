'use client'

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useMemo, useState } from "react"
import { PublicKey, Transaction, type AccountInfo } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";
import { Typography } from "@mui/material";
import { formatUnits } from "ethers";


export function Redeem() {
    const { publicKey, select, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const [emptyAccounts, setEmptyAccounts] = useState<Readonly<{
        account: AccountInfo<Buffer>;
        pubkey: PublicKey;
    }>[]>([]);
    const [scanLoading, setScanLoading] = useState(false);

    useEffect(() => {
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

                    if (amount > 1000000000000000000n) {
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
        console.log('tx===>', tx);


        try {
            const txhash = await sendTransaction(tx, connection).then(res => res).catch(console.error);
            console.log("txhash===>", txhash)
        } catch { }
    }, [publicKey, emptyAccounts, connection, sendTransaction])

    return (
        <div className="pt-6">
            <div className="flex flex-col items-center">
                <div className="lg:w-1/3 md:w-2/3 w-full">
                    <Alert variant="outlined" severity="success" classes={{ root: "flex items-center justify-center", message: "text-lg" }}>
                        Reclaim your forgotten SOL.(查询你忘记的SOL)
                    </Alert>
                </div>
                {
                    !publicKey && <Button variant="contained" size="large" onClick={() => select(PhantomWalletName)} className="my-4 md:w-2/3 w-5/6" classes={{ root: "!mt-6 !rounded-full" }}>Select Wallet</Button>
                }
                <div className="flex flex-col items-center mt-10">
                    <div className="font-semibold text-2xl">{formatUnits(claimSol, 9)}
                        <span className="text-xs ml-1">SOL</span>
                    </div>
                </div>

                <Button variant="contained" size="large" onClick={closeAccount} disabled={claimSol === 0} className="my-4 md:w-2/3 w-5/6" classes={{ root: "!mt-2  !rounded-full" }}>{claimSol > 0 ? `Reclaim (回收)` : scanLoading ? `Scanning for Eligible Accounts` : `No Reclaimed SOL`}</Button>

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

        </div>
    )
}
