import { useState, useEffect } from 'react';
import Head from 'next/head'
import styled from 'styled-components'
import WalletConnect from '../components/WalletConnect'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, #000 25%, transparent 25%) -25px 0,
      linear-gradient(-45deg, #000 25%, transparent 25%) -25px 0,
      linear-gradient(45deg, transparent 75%, #000 75%) -25px 0,
      linear-gradient(-45deg, transparent 75%, #000 75%) -25px 0;
    background-color: #111;
    background-size: 50px 50px;
    opacity: 0.2;
    z-index: 1;
    animation: pixelate 8s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, 
      rgba(88, 101, 242, 0.2) 0%,
      rgba(0, 0, 0, 0.5) 100%);
    z-index: 2;
  }
`;

const Logo = styled.div<{ $isConnected: boolean }>`
  width: ${props => props.$isConnected ? '300px' : '200px'};
  height: ${props => props.$isConnected ? '300px' : '200px'};
  border-radius: 50%;
  background-image: url('/images/logo.png');
  background-size: cover;
  background-position: center;
  image-rendering: pixelated;
  cursor: ${props => props.$isConnected ? 'pointer' : 'default'};
  transition: all 0.5s ease;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(${props => props.$isConnected ? 1.0 : 1.0}); }
    50% { transform: translateY(-10px) scale(${props => props.$isConnected ? 1.05 : 1.0}); }
  }
`;

const TapText = styled.h1`
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(16px, 4vw, 24px);
  margin-bottom: 20px;
  text-align: center;
  animation: blink 1s infinite;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
  
  @keyframes blink {
    50% { opacity: 0.5; }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showClaim, setShowClaim] = useState(false);

  const handleLogoClick = () => {
    if (!isConnected) return;
    
    setTapCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setShowClaim(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <>
      <Head>
        <title>KRXL NFT Minter</title>
        <meta name="description" content="Claim your KRXL NFT" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      
      <Container>
        <Content>
          <TapText>TAP TAP TAP<br/>FOR CLAIM YOUR NFT</TapText>
          <Logo 
            $isConnected={isConnected} 
            onClick={handleLogoClick}
          />
          <WalletConnect 
            onConnect={() => setIsConnected(true)}
            showClaim={showClaim}
          />
        </Content>
      </Container>
    </>
  )
} 