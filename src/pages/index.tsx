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

const Logo = styled.div<{ $isConnected?: boolean }>`
  width: ${({ $isConnected }) => $isConnected ? '500px' : '300px'};
  height: ${({ $isConnected }) => $isConnected ? '500px' : '300px'};
  border-radius: 50%;
  background-image: url('/images/logo.png');
  background-size: cover;
  background-position: center;
  image-rendering: pixelated;
  transition: all 0.5s ease;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1.0); }
    50% { transform: translateY(-10px) scale(1.05); }
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
  width: 100%;
`;

const WalletWrapper = styled.div`
  position: fixed;
  bottom: 50%;
  left: 20%;
  transform: translate(-50%, 50%);
  z-index: 5;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const MarketText = styled.div<{ $isConnected?: boolean }>`
  font-family: 'Rubik Glitch', cursive;
  font-size: ${({ $isConnected }) => $isConnected ? '120px' : '96px'};
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 40px 0;
  text-shadow: 0 0 20px rgba(255,255,255,0.4);
  position: relative;
  z-index: 4;
  letter-spacing: 4px;
  
  &.hi {
    color: #00ff9d;
    transform: rotate(-5deg);
  }
  
  &.lo {
    color: #ff3366;
    transform: rotate(5deg);
  }

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 100%;
    background: radial-gradient(circle, 
      rgba(0,0,0,0.8) 0%,
      rgba(0,0,0,0) 70%
    );
    z-index: -1;
  }
`;

const GraphIcon = styled.div`
  font-size: 60px;
  animation: pulse 2s infinite;
  filter: drop-shadow(0 0 15px rgba(255,255,255,0.4));
  
  &.up {
    color: #00ff9d;
    &::after {
      content: '📈';
      font-size: 80px;
    }
  }
  
  &.down {
    color: #ff3366;
    &::after {
      content: '📉';
      font-size: 80px;
    }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <Head>
        <title>KRXL NFT Minter</title>
        <meta name="description" content="Claim your KRXL NFT" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rubik+Glitch&display=swap" rel="stylesheet" />
      </Head>
      
      <Container>
        <Content>
          <MarketText className="hi">
            <GraphIcon className="up" />
            BUY
          </MarketText>
          <Logo $isConnected={isConnected} />
          <MarketText className="lo">
            SELL
            <GraphIcon className="down" />
          </MarketText>
        </Content>
        <WalletWrapper>
          <WalletConnect 
            onConnect={() => setIsConnected(true)}
            showClaim={false}
          />
        </WalletWrapper>
      </Container>
    </>
  )
} 