
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
});

interface Web3AuthContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAddress(accounts[0]);
      setIsConnected(true);
      
      // Store auth state
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = async () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  useEffect(() => {
    // Check if previously connected
    const connected = localStorage.getItem('walletConnected');
    const savedAddress = localStorage.getItem('walletAddress');
    
    if (connected && savedAddress) {
      setIsConnected(true);
      setAddress(savedAddress);
    }
  }, []);

  return (
    <WagmiConfig config={config}>
      <Web3AuthContext.Provider value={{ isConnected, address, connect, disconnect }}>
        {children}
      </Web3AuthContext.Provider>
    </WagmiConfig>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
};
