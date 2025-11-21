import { useState } from 'react';
import { Button } from './components/ui/button';
import { Launchpad } from './pages/Launchpad';
import { DEX } from './pages/DEX';
import { Logo } from './components/Logo';
import { WalletButton } from './components/WalletButton/WalletButton';

export default function App() {
  const [activeTab, setActiveTab] = useState<'launchpad' | 'dex'>('launchpad');

  return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Logo className="w-10 h-10" />
                  <span className="text-white text-xl">CryptoHub</span>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setActiveTab('launchpad')}
                    className={`${
                      activeTab === 'launchpad'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                        : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    } border-0`}
                  >
                    Launchpad
                  </Button>
                  <Button
                    onClick={() => setActiveTab('dex')}
                    className={`${
                      activeTab === 'dex'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                        : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    } border-0`}
                  >
                    DEX
                  </Button>
                </div>
              </div>
              <WalletButton/>
              {false && <ConnectWalletButton />}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'launchpad' ? <Launchpad /> : <DEX />}
      </div>
  );
}
