import { showConnect } from '@stacks/connect';
import { useState } from 'react';
import styled from 'styled-components';

interface WalletConnectProps {
  onConnect: () => void;
  showClaim: boolean;
}

const Button = styled.button`
  background: #8b4513;
  border: 4px solid #654321;
  color: white;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  image-rendering: pixelated;
  transition: all 0.3s ease;
  
  &:hover {
    background: #654321;
    transform: scale(1.05);
  }
`;

const ClaimButton = styled(Button)`
  background: #4CAF50;
  border-color: #45a049;
  opacity: 0;
  transform: scale(0);
  
  &.show {
    opacity: 1;
    transform: scale(1);
  }
  
  &:hover {
    background: #45a049;
  }
`;

const ClickText = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #fff;
  margin-top: 20px;
  opacity: 0.8;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
`;

export default function WalletConnect({ onConnect, showClaim }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'KRXL NFT',
        icon: '/images/logo.png',
      },
      onFinish: () => {
        setIsConnected(true);
        onConnect();
      },
      onCancel: () => {
        console.log('Wallet connection cancelled');
      },
    });
  };

  return (
    <>
      {!isConnected && (
        <Button onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
      {isConnected && !showClaim && (
        <ClickText>CLICK x3</ClickText>
      )}
      {isConnected && showClaim && (
        <ClaimButton className="show">
          Claim NFT
        </ClaimButton>
      )}
    </>
  );
} 