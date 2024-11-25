import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Address {
  symbol: string;
  address: string;
  type?: string;
  publicKey?: string;
  derivationPath?: string;
}

interface WalletConnectProps {
  onConnect: () => void;
  showClaim: boolean;
}

const ConnectButton = styled.button`
  background: #5865F2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  position: relative;

  &:hover {
    background: #4752C4;
  }
`;

const ClaimButton = styled(ConnectButton)`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s;
  
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function WalletConnect({ onConnect, showClaim }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);

  const checkWalletConnection = async () => {
    try {
      // @ts-ignore
      const provider = window?.LeatherProvider;
      if (provider) {
        const response = await provider.request("getAddresses");
        if (response?.result?.addresses?.length > 0) {
          const stxAddress = response.result.addresses.find((addr: Address) => addr.symbol === 'STX');
          if (stxAddress) {
            setIsConnected(true);
            onConnect();
          }
        }
      }
    } catch (error) {
      console.error('Wallet check failed:', error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const provider = window?.LeatherProvider;
      if (!provider) {
        window.open('https://leather.io/install-extension', '_blank');
        return;
      }

      const response = await provider.request("getAddresses");
      if (response?.result?.addresses?.length > 0) {
        const stxAddress = response.result.addresses.find((addr: Address) => addr.symbol === 'STX');
        if (stxAddress) {
          setIsConnected(true);
          onConnect();
        }
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <>
      <ConnectButton onClick={connectWallet}>
        {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </ConnectButton>

      {isConnected && showClaim && (
        <ClaimButton className="show">
          Claim NFT
        </ClaimButton>
      )}
    </>
  );
} 