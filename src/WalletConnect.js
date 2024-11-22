import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletName, setWalletName] = useState(null);

  const detectNeoWallet = useCallback(async () => {
    if (window.NeoLine) {
      setWalletName("NeoLine");
      connectToWallet(window.NeoLine);
    } else if (window.o3) {
      setWalletName("O3");
      connectToWallet(window.o3);
    } else if (window.Teemo) {
      setWalletName("Teemo");
      connectToWallet(window.Teemo);
    } else {
      alert("No Neo-compatible wallet detected. Please install NeoLine, O3, or Teemo.");
    }
  }, []);

  const connectToWallet = async (wallet) => {
    try {
      const account = await wallet.getAccount();
      setWalletAddress(account.address);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert("Could not connect to the wallet. Please make sure the wallet is unlocked.");
    }
  };

  useEffect(() => {
    detectNeoWallet();
  }, [detectNeoWallet]);  // detectNeoWallet is now a dependency

  const connectWalletHandler = () => {
    detectNeoWallet();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Neo DApp</h1>
      {walletAddress ? (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          <p>Wallet Provider: {walletName}</p>
        </div>
      ) : (
        <Button variant="contained" onClick={connectWalletHandler}>
          Connect Neo Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
