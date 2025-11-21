import { ConnectButton, useCurrentAccount, useSuiClientQuery, useDisconnectWallet } from '@mysten/dapp-kit';
import { useEffect } from 'react';
import { Button } from '../../components/ui/button';

const MIST_PER_SUI = 1_000_000_000;

export function WalletButton() {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();

    const { data, isLoading } = useSuiClientQuery(
        'getBalance',
        { owner: currentAccount?.address },
        { enabled: !!currentAccount }
    );

    const formatBalance = (balanceInMist) => {
        if (!balanceInMist) return '0.00';
        const balanceInSui = Number(balanceInMist.toString()) / MIST_PER_SUI;
        return balanceInSui.toFixed(2);
    };

    useEffect(() => {
        console.log('========== WALLET BALANCE DEBUG ==========');
        console.log('currentAccount:', currentAccount);
        console.log('address:', currentAccount?.address || 'não conectado');
        console.log('data:', data);
        console.log('totalBalance:', data?.totalBalance || 'sem dados');
        console.log('==========================================');
    }, [currentAccount, data]);

    // Se wallet conectada, mostra saldo + botão de disconnect
    if (currentAccount) {
        return (
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <div className="text-gray-400 text-xs">Balance</div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {isLoading ? 'Loading...' : formatBalance(data?.totalBalance)} SUI
                    </div>
                </div>
                <Button 
                    onClick={() => disconnect()}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                    {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
                </Button>
            </div>
        );
    }

    // Se não conectada, mostra botão de conectar
    return (
        <div>
            <ConnectButton />
        </div>
    );
}
