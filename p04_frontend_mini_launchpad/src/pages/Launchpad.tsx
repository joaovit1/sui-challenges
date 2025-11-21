import {useState, useEffect} from 'react';
import {Button} from '../components/ui/button';
import {Card} from '../components/ui/card';
import {Badge} from '../components/ui/badge';
import {Copy, ExternalLink, Check, Clock} from 'lucide-react';
import {ImageWithFallback} from '../components/figma/ImageWithFallback';
import {useCurrentAccount} from '@mysten/dapp-kit';

export function Launchpad() {
    const currentAccount = useCurrentAccount();

    const [minted, setMinted] = useState(7842);
    const [isMinting, setIsMinting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});

    const totalSupply = 10000;
    const mintPrice = 0.08;
    const contractAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

    const mintEndDate = new Date();
    mintEndDate.setDate(mintEndDate.getDate() + 3);
    mintEndDate.setHours(23, 59, 59, 999);

    const mintPercentage = (minted / totalSupply) * 100;

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = mintEndDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [mintEndDate]);

    const handleMint = async() => {
        if (!currentAccount) {
            alert('Conecte sua wallet primeiro!');
            return;
        }

        setIsMinting(true);

        console.log('Iniciando mint para:', currentAccount.address);

        setTimeout(() => {
            alert('Mint realizado com sucesso! (simulação)');
            setIsMinting(false);
        }, 2000);

        setIsMinting(true);

        try {
            setTimeout(() => {
                setMinted(prev => Math.min(prev + 1, totalSupply));
                setIsMinting(false);
                alert('NFT Minted Successfully! 🎉');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setIsMinting(false);
        }
    };

    const copyToClipboard = () => {
        navigator
            .clipboard
            .writeText(contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const attributes = [
        {
            label: "Rarity",
            value: "Legendary"
        }, {
            label: "Element",
            value: "Cyber"
        }, {
            label: "Power Level",
            value: "9500"
        }, {
            label: "Generation",
            value: "Genesis"
        }, {
            label: "Type",
            value: "Dragon"
        }, {
            label: "Edition",
            value: "1/1"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left Column - NFT Image */}
                <div className="space-y-6">
                    <Card
                        className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-lg border-cyan-500/30 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] relative">
                        <div className="aspect-square relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&q=80"
                                alt="Cyber Dragon Genesis #001"
                                className="w-full h-full object-cover"/>
                            <Badge
                                className="absolute bottom-6 left-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 px-4 py-2 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                                GENESIS COLLECTION
                            </Badge>
                        </div>
                    </Card>

                    {/* Mint Progress */}
                    <Card
                        className="bg-black/80 backdrop-blur-lg border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-white">Mint Progress</span>
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-2xl">
                                {mintPercentage.toFixed(0)}%
                            </span>
                        </div>
                        <div
                            className="h-3 bg-gray-900 border border-cyan-500/20 rounded-full overflow-hidden shadow-[inset_0_0_10px_rgba(6,182,212,0.3)]">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300"
                                style={{
                                width: `${mintPercentage}%`
                            }}/>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-gray-400 text-sm">
                            <span>{minted.toLocaleString()}
                                minted</span>
                            <span>{totalSupply.toLocaleString()}
                                total</span>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Info */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <h1 className="text-white text-5xl mb-4">Cyber Dragon Genesis #001</h1>
                        <p className="text-gray-400 text-lg">
                            A legendary cyber dragon from the genesis collection. First of its kind,
                            combining ancient mysticism with futuristic technology.
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <Card
                        className="bg-black/80 backdrop-blur-lg border-purple-500/30 p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-purple-400"/>
                            <span className="text-white">Mint Ends In</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                {
                                    label: 'Days',
                                    value: timeLeft.days
                                }, {
                                    label: 'Hours',
                                    value: timeLeft.hours
                                }, {
                                    label: 'Minutes',
                                    value: timeLeft.minutes
                                }, {
                                    label: 'Seconds',
                                    value: timeLeft.seconds
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4 mb-2 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                                        <span
                                            className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                            {String(item.value).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Price & Mint */}
                    <Card
                        className="bg-black/80 backdrop-blur-lg border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div
                                className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
                                <div className="text-gray-400 text-sm mb-1">Price</div>
                                <div
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-2xl">
                                    {mintPrice}
                                    SUI
                                </div>
                            </div>
                            <div
                                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg p-4">
                                <div className="text-gray-400 text-sm mb-1">Available</div>
                                <div className="text-white text-2xl">
                                    {(totalSupply - minted).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-lg shadow-[0_0_30px_rgba(6,182,212,0.5)] border-0"
                            onClick={handleMint}
                            disabled={isMinting || minted >= totalSupply || !currentAccount}>
                            {!currentAccount
                                ? 'Connect Wallet to Mint'
                                : isMinting
                                    ? 'Minting...'
                                    : minted >= totalSupply
                                        ? 'Sold Out'
                                        : 'Mint Now'}
                        </Button>

                        {currentAccount && (
                            <div className="mt-4 text-center">
                                <span className="text-gray-400 text-sm">Connected:
                                </span>
                                <span className="text-cyan-400 text-sm">{currentAccount
                                        .address
                                        .slice(0, 10)}...{currentAccount
                                        .address
                                        .slice(-8)}</span>
                            </div>
                        )}
                    </Card>

                    {/* Contract Details */}
                    <Card
                        className="bg-black/80 backdrop-blur-lg border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <h3 className="text-white mb-4">Contract Details</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-gray-400 text-sm mb-2">Network</div>
                                <div className="text-white">Sui Mainnet</div>
                            </div>

                            <div>
                                <div className="text-gray-400 text-sm mb-2">Contract Address</div>
                                <div className="flex items-center gap-2">
                                    <code
                                        className="text-cyan-400 text-sm flex-1 truncate bg-cyan-500/10 px-3 py-2 rounded border border-cyan-500/30">
                                        {contractAddress}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-cyan-400 hover:bg-cyan-500/10 h-9 w-9 p-0 border border-cyan-500/30"
                                        onClick={copyToClipboard}>
                                        {copied
                                            ? <Check className="w-4 h-4"/>
                                            : <Copy className="w-4 h-4"/>}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-cyan-400 hover:bg-cyan-500/10 h-9 w-9 p-0 border border-cyan-500/30"
                                        asChild>
                                        <a
                                            href={`https://suiscan.xyz/mainnet/object/${contractAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4"/>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Attributes */}
                    <Card
                        className="bg-black/80 backdrop-blur-lg border-purple-500/30 p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <h3 className="text-white mb-4">Attributes</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {attributes.map((attr, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
                                    <div className="text-gray-400 text-sm mb-1">{attr.label}</div>
                                    <div className="text-white">{attr.value}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}