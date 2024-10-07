'use client'
import { useState } from "react";
import QRCode from "react-qr-code";
import { Settings, Scan, Copy, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

export default function CryptoWallet() {
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [address] = useState("0x1234...5678");
  const [balance] = useState("1.2345 ETH");
  const [tokens] = useState([
    { name: "Ethereum", symbol: "ETH", balance: "1.2345" },
    { name: "Bitcoin", symbol: "BTC", balance: "0.1234" },
    { name: "Cardano", symbol: "ADA", balance: "100.00" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Crypto Wallet
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <Scan className="h-6 w-6" />
          </Button>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold text-gray-900">{balance}</h2>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <p className="text-sm text-gray-600">{address}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center">
            <QRCode value={address} size={128} />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {tokens.map((token, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
            >
              <div>
                <p className="font-semibold text-gray-800">{token.name}</p>
                <p className="text-sm text-gray-600">{token.symbol}</p>
              </div>
              <p className="font-bold text-gray-800">{token.balance}</p>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setShowTransferDialog(true)}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
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
              <Input id="recipient" placeholder="Enter recipient address" />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <Input id="amount" type="number" placeholder="Enter amount" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Confirm Transfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
