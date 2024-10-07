"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wallet } from "fuels";

const ImportWallet = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  // const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const myWallet = Wallet.fromMnemonic(seedPhrase);
    console.log("myWallet", myWallet.address);
    console.log("myWallet", myWallet.address.toB256());
    console.log("myWallet", myWallet.privateKey);

    localStorage.setItem("seedPhrase", seedPhrase);
    localStorage.setItem("walletAddress", myWallet.address.toB256());
    localStorage.setItem("fuelwalletAddress", myWallet.address.toString());
    localStorage.setItem("privateKey", myWallet.privateKey);

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-[#54A9EB]">
        Import Existing Wallet
      </h1>
      <form onSubmit={handleSubmit} className="my-auto w-full ">
        <Textarea
          placeholder="Enter your 12-word seed phrase"
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
          required
          className="h-32 bg-[#2C2C2C] text-white border-[#54A9EB] focus:border-[#4A94D1]"
        />
        <Button
          type="submit"
          className="w-full bg-[#54A9EB] hover:bg-[#4A94D1] text-white"
        >
          Import Wallet
        </Button>
      </form>
    </div>
  );
};

export default ImportWallet;
