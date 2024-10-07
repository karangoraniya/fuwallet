"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { english, generateMnemonic } from "viem/accounts";
import { Wallet, WalletUnlocked } from "fuels";
import { Copy, CopyCheck } from "lucide-react";

const CreateWallet: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    createWallet();
  }, []);

  const createWallet = () => {
    try {
      const mnemonic = generateMnemonic(english);
      setSeedPhrase(mnemonic);

      const myWalletSeed: WalletUnlocked = Wallet.fromMnemonic(mnemonic);
      const walletAddress = myWalletSeed.address.toString();
      const privateKey = myWalletSeed.privateKey;

      // Store in local storage
      localStorage.setItem("seedPhrase", mnemonic);
      localStorage.setItem(
        "fuelwalletAddress",
        myWalletSeed.address.toString()
      );
      localStorage.setItem("walletAddress", walletAddress);
      localStorage.setItem("privateKey", privateKey);

      console.log("Wallet created and stored in local storage");
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(seedPhrase).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E1E] text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-[#54A9EB]">
        Your Seed Phrase
      </h1>
      <div className="bg-[#2C2C2C] p-6 rounded-md mb-8 w-full max-w-md">
        <p className="text-center font-mono text-[#54A9EB] break-words mb-4">
          {seedPhrase}
        </p>
        <Button
          onClick={copyToClipboard}
          className="w-fit bg-[#54A9EB] hover:bg-[#4A94D1] text-white mt-4 p-2"
        >
          {isCopied ? (
            <>
              <CopyCheck />
            </>
          ) : (
            <>
              <Copy />
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-center mb-8 max-w-md">
        Write down this seed phrase and store it in a safe place. You will need
        it to recover your wallet.
      </p>
      <Button
        onClick={() => router.push("/dashboard")}
        className="w-full max-w-xs bg-[#54A9EB] hover:bg-[#4A94D1] text-white"
      >
        I have Saved My Seed Phrase
      </Button>
    </div>
  );
};

export default CreateWallet;
