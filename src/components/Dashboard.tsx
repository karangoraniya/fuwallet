"use client";
import React, { useState, useEffect, use } from "react";
import { Provider, Wallet, BN } from "fuels";
import QRCode from "react-qr-code";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessTransactionDialog } from "@/components/SuccessTransactionDialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast, Toaster } from "react-hot-toast";
import {
  Send,
  QrCode,
  Copy,
  ExternalLink,
  Eye,
  Plus,
  Wallet as WalletIcon,
  Check,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ETH from "@/images";

const FuelWallet = () => {
  const [balance, setBalance] = useState(0);
  const [b256Address, setB256Address] = useState("");
  const [fuelAddress, setFuelAddress] = useState("");
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);

  const TESTNET_URL = "https://testnet.fuel.network/v1/graphql";

  useEffect(() => {
    const fetchWalletInfo = async () => {
      const storedPrivateKey = localStorage.getItem("privateKey");
      const b256 = localStorage.getItem("walletAddress");
      const fuel = localStorage.getItem("fuelwalletAddress");

      if (storedPrivateKey && b256 && fuel) {
        setPrivateKey(storedPrivateKey);
        setB256Address(b256);
        setFuelAddress(fuel);

        try {
          const provider = await Provider.create(TESTNET_URL);
          const myWallet = Wallet.fromPrivateKey(storedPrivateKey, provider);
          const balanceBN = await myWallet.getBalance(
            provider.getBaseAssetId()
          );
          setBalance(Number(balanceBN.format({ precision: 9 })));
        } catch (error) {
          console.error("Error fetching wallet info:", error);
          toast.error("Failed to fetch wallet information");
        }
      }
    };

    fetchWalletInfo();
  }, []);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Add validation function
  const validateInput = (address: string, amount: string) => {
    return address.trim() !== "" && Number(amount) > 0;
  };

  // Update input handlers
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
    setIsValidInput(validateInput(e.target.value, amount));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setIsValidInput(validateInput(recipientAddress, e.target.value));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${type} address copied!`, {
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "📋",
        });
      })
      .catch(() => {
        toast.error("Failed to copy address", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      const provider = await Provider.create(TESTNET_URL);
      const sender = Wallet.fromPrivateKey(privateKey, provider);
      const baseAssetId = sender.provider.getBaseAssetId();

      const response = await sender.transfer(
        recipientAddress,
        Number(amount),
        baseAssetId
      );

      const tx = await response.wait();
      setTxHash(tx.id);
      console.log(tx);
      console.log(tx.id, "id");

      // Update balance
      const newBalanceBN = await sender.getBalance(baseAssetId);
      setBalance(Number(newBalanceBN.format({ precision: 9 })));

      // Close transfer dialog and show success
      setShowTransferDialog(false);
      setShowSuccessDialog(true);

      // Reset form
      setRecipientAddress("");
      setAmount("");
      setIsValidInput(false);

      // Add a timeout to auto-close success dialog
      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 5000); // 5 seconds
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderAssets = () => {
    if (balance > 0) {
      return (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Image
                    src={ETH}
                    alt="ETH"
                    className="w-6 h-6"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3 className="text-lg text-white font-medium">Ethereum</h3>
                  <p className="text-sm text-zinc-400">ETH</p>
                </div>
              </div>
              <p className="text-lg text-white">{balance} ETH</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-xl text-white mb-2">You don't have any assets</p>
            <p className="text-zinc-400 mb-4">Start depositing some assets</p>
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-black">
              <WalletIcon className="w-4 h-4 mr-2" />
              Bridge to Fuel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-400 rounded-lg" />
          <span className="text-lg font-medium">FuWallet</span>
        </div>
      </div>

      {/* Account Section */}
      <Card className="bg-zinc-900 border-zinc-800 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-700 to-blue-700" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  EVM: {truncateAddress(b256Address)}
                </span>
                <button
                  onClick={() => copyToClipboard(b256Address, "B256")}
                  className="text-zinc-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  Fuel: {truncateAddress(fuelAddress)}
                </span>
                <button
                  onClick={() => copyToClipboard(fuelAddress, "Fuel")}
                  className="text-zinc-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Section */}
      <div className="mb-6">
        <h3 className="text-zinc-400 mb-2">Balance</h3>
        <div className="flex items-center gap-2 text-3xl font-medium mb-4">
          <span>ETH</span>
          <span>{balance}</span>
          <Eye className="w-6 h-6 text-zinc-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setShowTransferDialog(true)}
            variant="outline"
            className="bg-black hover:bg-zinc-900 text-white border-zinc-700 py-6 hover:border-zinc-600"
          >
            <Send className="w-5 h-5 mr-2" />
            Send
          </Button>
          <Button
            onClick={() => setShowReceiveDialog(true)}
            variant="outline"
            className="border-zinc-700 py-6 text-black"
          >
            <Plus className="w-5 h-5 mr-2" />
            Receive
          </Button>
        </div>
      </div>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Recipient Address
              </label>
              <Input
                value={recipientAddress}
                onChange={handleAddressChange}
                placeholder="Enter recipient address"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                disabled={isLoading}
              />
            </div>
            <Button
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-black"
              onClick={handleTransfer}
              disabled={isLoading || !isValidInput}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Transfer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <WalletIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-medium">Assets</h3>
        </div>
        {renderAssets()}
      </div>

      {/* Receive Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 flex flex-col items-center">
            <QRCode value={fuelAddress} size={200} />
            <p className="text-sm text-zinc-400 text-center break-all">
              {fuelAddress}
            </p>
            <Button
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-black"
              onClick={() => copyToClipboard(fuelAddress, "Fuel")}
            >
              Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessTransactionDialog
        isOpen={showSuccessDialog}
        onClose={setShowSuccessDialog}
        txHash={txHash}
      />
    </div>
  );
};

export default FuelWallet;
