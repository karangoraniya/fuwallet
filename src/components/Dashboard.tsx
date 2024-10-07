"use client";
import { useState, useEffect } from "react";
import { Provider, Wallet, BN } from "fuels";
import QRCode from "react-qr-code";
import { Settings, Scan, Copy, Send, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [b256Address, setB256Address] = useState("");
  const [fuelAddress, setFuelAddress] = useState("");
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showScannerDialog, setShowScannerDialog] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");

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
          const balanceBN: BN = await myWallet.getBalance(
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

  const handleScan = (result: string | null) => {
    if (result) {
      setRecipientAddress(result);
      setShowScannerDialog(false);
      setShowTransferDialog(true);
    }
  };

  const handleTransfer = async () => {
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
      console.log(tx);
      toast.success("Transfer successful!");
      setShowTransferDialog(false);
      setRecipientAddress("");
      setAmount("");

      // Refresh balance after transfer
      const newBalanceBN: BN = await sender.getBalance(baseAssetId);
      setBalance(Number(newBalanceBN.format({ precision: 9 })));
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed. Please try again.");
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-black">
      <div className="bg-white rounded-3xl shadow-2xl p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            FulWallet
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setShowScannerDialog(true)}
          >
            <Scan className="h-6 w-6" />
          </Button>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Balance</p>
            <h2 className="text-2xl font-bold text-gray-900">{balance} ETH</h2>
          </div>
          <div className="flex flex-col items-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">B256: {truncateAddress(b256Address)}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => copyToClipboard(b256Address, "B256")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">Fuel: {truncateAddress(fuelAddress)}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => copyToClipboard(fuelAddress, "Fuel")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setShowTransferDialog(true)}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => setShowReceiveDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Receive
          </Button>
        </div>
      </div>

      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Recipient Address
              </label>
              <Input
                id="recipient"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient address"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleTransfer}
            >
              Confirm Transfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 flex flex-col items-center">
            <QRCode value={fuelAddress} size={200} />
            <p className="text-sm text-gray-600 text-center break-all">{fuelAddress}</p>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => copyToClipboard(fuelAddress, "Fuel")}
            >
              Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}