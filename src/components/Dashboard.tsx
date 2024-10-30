// "use client";
// import { useState, useEffect } from "react";
// import { Provider, Wallet, BN } from "fuels";
// import QRCode from "react-qr-code";
// import { Settings, Scan, Copy, Send, Plus, X, HistoryIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { toast } from "react-hot-toast";

// interface WalletInfo {
//   privateKey: string;
//   b256Address: string;
//   fuelwalletAddress: string;
// }

// export default function Dashboard() {
//   const [balance, setBalance] = useState(0);
//   const [b256Address, setB256Address] = useState("");
//   const [fuelAddress, setFuelAddress] = useState("");
//   const [showTransferDialog, setShowTransferDialog] = useState(false);
//   const [showReceiveDialog, setShowReceiveDialog] = useState(false);
//   const [showScannerDialog, setShowScannerDialog] = useState(false);
//   const [recipientAddress, setRecipientAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [privateKey, setPrivateKey] = useState("");
//   const [showHistoryDialog, setShowHistoryDialog] = useState(false);
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const [isHistoryLoading, setIsHistoryLoading] = useState(false);
//   const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

//   const TESTNET_URL = "https://testnet.fuel.network/v1/graphql";

// //  for transaction history
//   // useEffect(() => {
//   //   const fetchWalletInfo = async () => {
//   //     const storedPrivateKey = localStorage.getItem("privateKey");
//   //     if (storedPrivateKey) {
//   //       const provider = await Provider.create(TESTNET_URL);
//   //       const myWallet = Wallet.fromPrivateKey(storedPrivateKey, provider);

//   //       // Fetch balance
//   //       const balanceBN = await myWallet.getBalance(provider.getBaseAssetId());
//   //       setBalance(Number(balanceBN.format({ precision: 9 })));

//   //       setFuelAddress(myWallet.address);
//   //     }
//   //   };

//   //   fetchWalletInfo();
//   // }, []);

//   // const fetchTransactionHistory = async () => {
//   //   setIsHistoryLoading(true);
//   //   try {
//   //     const provider = await Provider.create(TESTNET_URL);
//   //     const wallet = Wallet.fromPrivateKey(localStorage.getItem("privateKey"), provider);

//   //     // Fetch transaction history
//   //     const history = await wallet.getTransactions();
//   //     setTransactionHistory(history);
//   //   } catch (error) {
//   //     console.error("Error fetching transaction history:", error);
//   //     toast.error("Failed to fetch transaction history.");
//   //   } finally {
//   //     setIsHistoryLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     const fetchWalletInfo = async () => {
//       const storedPrivateKey = localStorage.getItem("privateKey");
//       const b256 = localStorage.getItem("walletAddress");
//       const fuel = localStorage.getItem("fuelwalletAddress");

//       if (storedPrivateKey && b256 && fuel) {
//         setPrivateKey(storedPrivateKey);
//         setB256Address(b256);
//         setFuelAddress(fuel);

//         try {
//           const provider = await Provider.create(TESTNET_URL);
//           const myWallet = Wallet.fromPrivateKey(storedPrivateKey, provider);
//           const balanceBN: BN = await myWallet.getBalance(
//             provider.getBaseAssetId()
//           );
//           setBalance(Number(balanceBN.format({ precision: 9 })));
//         } catch (error) {
//           console.error("Error fetching wallet info:", error);
//           toast.error("Failed to fetch wallet information");
//         }
//       }
//     };

//     fetchWalletInfo();
//   }, []);

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   const copyToClipboard = (text: string, type: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast.success(`${type} address copied!`, {
//           style: {
//             background: "#333",
//             color: "#fff",
//           },
//           icon: "📋",
//         });
//       })
//       .catch(() => {
//         toast.error("Failed to copy address", {
//           style: {
//             background: "#333",
//             color: "#fff",
//           },
//         });
//       });
//   };

//   const handleTransfer = async () => {
//     try {
//       const provider = await Provider.create(TESTNET_URL);
//       const sender = Wallet.fromPrivateKey(privateKey, provider);
//       const baseAssetId = sender.provider.getBaseAssetId();

//       const response = await sender.transfer(
//         recipientAddress,
//         Number(amount),
//         baseAssetId
//       );

//       const tx = await response.wait();
//       console.log(tx);
//       toast.success("Transfer successful!");
//       setShowTransferDialog(false);
//       setRecipientAddress("");
//       setAmount("");

//       // Refresh balance after transfer
//       const newBalanceBN: BN = await sender.getBalance(baseAssetId);
//       setBalance(Number(newBalanceBN.format({ precision: 9 })));
//     } catch (error) {
//       console.error("Transfer error:", error);
//       toast.error("Transfer failed. Please try again.");
//     }
//   };

//   return (
//     <div className="h-[90vh] max-h-screen flex items-center justify-center bg-gray-900 overflow-y-hidden overflow-hidden">
//       <div className="bg-gray-500/50 text-white rounded-xl shadow-2xl p-4 w-full max-w-md backdrop-blur-sm">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold text-center">FulWallet</h1>
//           <Button
//             className="w- bg-transparent shadow-none hover:bg-white text-white hover:text-gray-900"
//             onClick={() => {
//               setShowHistoryDialog(true);
//               // fetchTransactionHistory();
//             }}
//           >
//             <HistoryIcon />
//           </Button>
//         </div>

//         <div className="bg-gray-100 rounded-2xl p-6 mb-8">
//           <div className="text-center mb-4">
//             <p className="text-sm text-gray-600 mb-1">Balance</p>
//             <h2 className="text-2xl font-bold text-gray-900">{balance} ETH</h2>
//           </div>
//           <div className="flex flex-col items-center space-y-2 mb-4">
//             <div className="flex items-center space-x-2">
//               <p className="text-sm text-gray-600">
//                 B256: {truncateAddress(b256Address)}
//               </p>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-600 hover:text-gray-900"
//                 onClick={() => copyToClipboard(b256Address, "B256")}
//               >
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <p className="text-sm text-gray-600">
//                 Fuel: {truncateAddress(fuelAddress)}
//               </p>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-600 hover:text-gray-900"
//                 onClick={() => copyToClipboard(fuelAddress, "Fuel")}
//               >
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="flex space-x-4">
//           <Button
//             className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
//             onClick={() => setShowTransferDialog(true)}
//           >
//             <Send className="h-4 w-4 mr-2" />
//             Send
//           </Button>
//           <Button
//             className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
//             onClick={() => setShowReceiveDialog(true)}
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Receive
//           </Button>
//         </div>
//       </div>

//       {/* transfer Fund Dialog */}
//       <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Transfer Funds</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="recipient"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Recipient Address
//               </label>
//               <Input
//                 id="recipient"
//                 value={recipientAddress}
//                 onChange={(e) => setRecipientAddress(e.target.value)}
//                 placeholder="Enter recipient address"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="amount"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Amount
//               </label>
//               <Input
//                 id="amount"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount"
//               />
//             </div>
//             <Button
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//               onClick={handleTransfer}
//             >
//               Confirm Transfer
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Receive fund dialog  */}
//       <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Receive Funds</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 flex flex-col items-center">
//             <QRCode value={fuelAddress} size={200} />
//             <p className="text-sm text-gray-600 text-center break-all">
//               {fuelAddress}
//             </p>
//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//               onClick={() => copyToClipboard(fuelAddress, "Fuel")}
//             >
//               Copy Address
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Transaction History Dialog */}
//       <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Transaction History</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             {isHistoryLoading ? (
//               <p>Loading...</p>
//             ) : transactionHistory.length > 0 ? (
//               <ul>
//                 {transactionHistory.map((tx, index) => (
//                   <li key={index} className="border-b py-2">
//                     <p>
//                       <strong>Transaction ID:</strong> {tx.id}
//                     </p>
//                     <p>
//                       <strong>Amount:</strong> {tx.amount} ETH
//                     </p>
//                     <p>
//                       <strong>Status:</strong> {tx.status}
//                     </p>
//                     <p>
//                       <strong>Date:</strong>{" "}
//                       {new Date(tx.timestamp).toLocaleString()}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No transactions found.</p>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Provider, Wallet, BN, Transaction } from "fuels"; // Ensure Transaction type exists
import QRCode from "react-qr-code";
import {
  Settings,
  Scan,
  Copy,
  Send,
  Plus,
  X,
  History as HistoryIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

interface WalletInfo {
  privateKey: string;
  b256Address: string;
  fuelwalletAddress: string;
}

interface TransactionDetails {
  id: string;
  amount: number;
  status: string;
  timestamp: number;
}

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [b256Address, setB256Address] = useState<string>("");
  const [fuelAddress, setFuelAddress] = useState<string>("");
  const [showTransferDialog, setShowTransferDialog] = useState<boolean>(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState<boolean>(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [showHistoryDialog, setShowHistoryDialog] = useState<boolean>(false);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionDetails[]
  >([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);

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

  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${type} address copied!`, {
          style: { background: "#333", color: "#fff" },
          icon: "📋",
        });
      })
      .catch(() => {
        toast.error("Failed to copy address", {
          style: { background: "#333", color: "#fff" },
        });
      });
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

      const newBalanceBN: BN = await sender.getBalance(baseAssetId);
      setBalance(Number(newBalanceBN.format({ precision: 9 })));
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed. Please try again.");
    }
  };

  const fetchTransactionHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const provider = await Provider.create(TESTNET_URL);
      const wallet = Wallet.fromPrivateKey(
        localStorage.getItem("privateKey") || "",
        provider
      );

      const history: TransactionDetails[] = await wallet.getTransactions();
      setTransactionHistory(history);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error("Failed to fetch transaction history.");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  return (
    <div className="h-[90vh] max-h-screen flex items-center justify-center bg-gray-900 overflow-y-hidden overflow-hidden">
      <div className="bg-gray-500/50 text-white rounded-xl shadow-2xl p-4 w-full max-w-md backdrop-blur-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-center">FulWallet</h1>
          <Button
            className="bg-transparent shadow-none hover:bg-white text-white hover:text-gray-900"
            onClick={() => {
              setShowHistoryDialog(true);
              fetchTransactionHistory();
            }}
          >
            <HistoryIcon />
          </Button>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Balance</p>
            <h2 className="text-2xl font-bold text-gray-900">{balance} ETH</h2>
          </div>
          <div className="flex flex-col items-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">
                B256: {truncateAddress(b256Address)}
              </p>
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
              <p className="text-sm text-gray-600">
                Fuel: {truncateAddress(fuelAddress)}
              </p>
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
            <Send className="h-4 w-4 mr-2" /> Send
          </Button>
          <Button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => setShowReceiveDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Receive
          </Button>
        </div>
      </div>

      
      {/* transfer Fund Dialog */}
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

      {/* Receive fund dialog  */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 flex flex-col items-center">
            <QRCode value={fuelAddress} size={200} />
            <p className="text-sm text-gray-600 text-center break-all">
              {fuelAddress}
            </p>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => copyToClipboard(fuelAddress, "Fuel")}
            >
              Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {isHistoryLoading ? (
              <p>Loading...</p>
            ) : transactionHistory.length > 0 ? (
              <ul>
                {transactionHistory.map((tx, index) => (
                  <li key={index} className="border-b py-2">
                    <p>
                      <strong>Transaction ID:</strong> {tx.id}
                    </p>
                    <p>
                      <strong>Amount:</strong> {tx.amount} ETH
                    </p>
                    <p>
                      <strong>Status:</strong> {tx.status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
