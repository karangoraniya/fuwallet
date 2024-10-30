"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ImportWallet = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-[90dvh] overflow-y-hidden bg-gray-900 text-white gap-4">
      <h1 className="text-3xl font-bold mb-8 text-[#54A9EB]">
        Import Existing Wallet
      </h1>
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md flex flex-col gap-5">
        <Textarea
          placeholder="Enter your 12-word seed phrase"
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
          required
          className="h-32 bg-[#2C2C2C] text-white border-[#54A9EB] focus:border-[#4A94D1]"
        />
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#2C2C2C] text-white border-[#54A9EB] focus:border-[#4A94D1]"
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
