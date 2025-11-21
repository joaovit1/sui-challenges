import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowDownUp, ChevronDown, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  balance?: number;
}

const TOKENS: Token[] = [
  { symbol: 'SUI', name: 'Sui', logo: '🔵' },
  { symbol: 'USDC', name: 'USD Coin', logo: '💵' },
  { symbol: 'USDT', name: 'Tether', logo: '💰' },
  { symbol: 'BTC', name: 'Bitcoin', logo: '₿' },
  { symbol: 'ETH', name: 'Ethereum', logo: 'Ξ' },
  { symbol: 'SOL', name: 'Solana', logo: '◎' },
];

export function DEX() {
  const account = true, balances = {['a']:''}
  
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [customSlippage, setCustomSlippage] = useState('');

  // Mock exchange rate (in real app, this would come from an API)
  const getExchangeRate = (from: string, to: string) => {
    const rates: { [key: string]: number } = {
      'SUI-USDC': 2.15,
      'USDC-SUI': 0.465,
      'SUI-USDT': 2.14,
      'USDT-SUI': 0.467,
      'BTC-USDC': 65000,
      'USDC-BTC': 0.0000154,
      'ETH-USDC': 3500,
      'USDC-ETH': 0.000286,
      'SOL-USDC': 145,
      'USDC-SOL': 0.0069,
    };
    return rates[`${from}-${to}`] || 1;
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const rate = getExchangeRate(fromToken.symbol, toToken.symbol);
      setToAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const rate = getExchangeRate(toToken.symbol, fromToken.symbol);
      setFromAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setFromAmount('');
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSwapping(true);
    // Simulate swap transaction
    setTimeout(() => {
      setIsSwapping(false);
      alert(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} 🎉`);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  const selectFromToken = (token: Token) => {
    if (token.symbol !== toToken.symbol) {
      setFromToken(token);
      setShowFromTokens(false);
      if (fromAmount) {
        const rate = getExchangeRate(token.symbol, toToken.symbol);
        setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
      }
    }
  };

  const selectToToken = (token: Token) => {
    if (token.symbol !== fromToken.symbol) {
      setToToken(token);
      setShowToTokens(false);
      if (fromAmount) {
        const rate = getExchangeRate(fromToken.symbol, token.symbol);
        setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
      }
    }
  };

  const TokenSelector = ({ 
    token, 
    onClick, 
    showBalance = true 
  }: { 
    token: Token; 
    onClick: () => void;
    showBalance?: boolean;
  }) => (
    <Button
      onClick={onClick}
      className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-500/50 text-white h-auto py-3 px-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{token.logo}</span>
        <div className="flex flex-col items-start">
          <span className="text-lg">{token.symbol}</span>
          {showBalance && account && balances[token.symbol] !== undefined && (
            <span className="text-xs text-gray-400">
              Balance: {balances[token.symbol].toLocaleString()}
            </span>
          )}
        </div>
        <ChevronDown className="w-5 h-5 ml-2" />
      </div>
    </Button>
  );

  const TokenList = ({ onSelect, currentToken }: { onSelect: (token: Token) => void; currentToken: Token }) => (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {TOKENS.map((token) => (
        <Button
          key={token.symbol}
          onClick={() => onSelect(token)}
          disabled={token.symbol === currentToken.symbol}
          className={`w-full justify-between h-auto py-4 px-4 ${
            token.symbol === currentToken.symbol
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-500/50 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{token.logo}</span>
            <div className="flex flex-col items-start">
              <span className="text-lg">{token.symbol}</span>
              <span className="text-sm text-gray-400">{token.name}</span>
            </div>
          </div>
          {account && balances[token.symbol] !== undefined && (
            <span className="text-gray-400">
              {balances[token.symbol].toLocaleString()}
            </span>
          )}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl mb-4">Swap Tokens</h1>
          <p className="text-gray-400 text-lg">
            Trade crypto instantly with the best rates
          </p>
        </div>

        {/* Swap Card */}
        <Card className="bg-black/80 backdrop-blur-lg border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl">Swap</h2>
            <Button
              size="sm"
              variant="ghost"
              className="text-cyan-400 hover:bg-cyan-500/10 h-9 w-9 p-0 border border-cyan-500/30"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* From Token */}
          <div className="space-y-2 mb-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-400 text-sm">From</label>
              {account && balances[fromToken.symbol] !== undefined && (
                <span className="text-gray-400 text-sm">
                  Balance: {balances[fromToken.symbol].toLocaleString()}
                </span>
              )}
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-2xl outline-none flex-1 w-full"
                />
                <TokenSelector token={fromToken} onClick={() => setShowFromTokens(true)} />
              </div>
              {fromAmount && (
                <div className="mt-2 text-gray-400 text-sm">
                  ≈ ${(parseFloat(fromAmount) * getExchangeRate(fromToken.symbol, 'USDC')).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <Button
              onClick={handleSwapTokens}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 shadow-[0_0_20px_rgba(6,182,212,0.5)] h-10 w-10 p-0 rounded-full"
            >
              <ArrowDownUp className="w-5 h-5" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-400 text-sm">To</label>
              {account && balances[toToken.symbol] !== undefined && (
                <span className="text-gray-400 text-sm">
                  Balance: {balances[toToken.symbol].toLocaleString()}
                </span>
              )}
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center gap-4">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => handleToAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-2xl outline-none flex-1 w-full"
                />
                <TokenSelector token={toToken} onClick={() => setShowToTokens(true)} />
              </div>
              {toAmount && (
                <div className="mt-2 text-gray-400 text-sm">
                  ≈ ${(parseFloat(toAmount) * getExchangeRate(toToken.symbol, 'USDC')).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          {fromAmount && toAmount && (
            <div className="mt-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Rate</span>
                <span className="text-white text-sm">
                  1 {fromToken.symbol} = {getExchangeRate(fromToken.symbol, toToken.symbol).toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Slippage Tolerance</span>
                <span className="text-white text-sm">{slippage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Network Fee</span>
                <span className="text-white text-sm">~0.001 SUI</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!account || !fromAmount || !toAmount || isSwapping}
            className="w-full h-14 mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-lg shadow-[0_0_30px_rgba(6,182,212,0.5)] border-0"
          >
            {!account ? 'Connect Wallet to Swap' : isSwapping ? 'Swapping...' : 'Swap'}
          </Button>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: '24h Volume', value: '$2.5M' },
            { label: 'Total Liquidity', value: '$45.2M' },
            { label: 'Total Trades', value: '12,543' },
          ].map((stat, index) => (
            <Card key={index} className="bg-black/80 backdrop-blur-lg border-cyan-500/30 p-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl">
                {stat.value}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Token Selection Dialogs */}
      <Dialog open={showFromTokens} onOpenChange={setShowFromTokens}>
        <DialogContent className="bg-black/95 backdrop-blur-lg border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-white">Select Token</DialogTitle>
          </DialogHeader>
          <TokenList onSelect={selectFromToken} currentToken={fromToken} />
        </DialogContent>
      </Dialog>

      <Dialog open={showToTokens} onOpenChange={setShowToTokens}>
        <DialogContent className="bg-black/95 backdrop-blur-lg border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-white">Select Token</DialogTitle>
          </DialogHeader>
          <TokenList onSelect={selectToToken} currentToken={toToken} />
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-black/95 backdrop-blur-lg border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-white">Transaction Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-white text-sm mb-3 block">Slippage Tolerance</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['0.1', '0.5', '1.0', '3.0'].map((value) => (
                  <Button
                    key={value}
                    onClick={() => {
                      setSlippage(value);
                      setCustomSlippage('');
                    }}
                    className={`${
                      slippage === value && !customSlippage
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0'
                        : 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-white hover:border-cyan-500/50'
                    }`}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={customSlippage}
                  onChange={(e) => {
                    setCustomSlippage(e.target.value);
                    if (e.target.value) {
                      setSlippage(e.target.value);
                    }
                  }}
                  placeholder="Custom"
                  className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-white placeholder:text-gray-500"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
            <Button
              onClick={() => setShowSettings(false)}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] border-0"
            >
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
