"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CreateWallet = () => {
  const [seedPhrase] = useState(
    "apple banana cherry dog elephant frog giraffe horse iguana jaguar koala lion"
  );
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E1E] text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-[#54A9EB]">
        Your Seed Phrase
      </h1>
      <div className="bg-[#2C2C2C] p-6 rounded-md mb-8 w-full max-w-md">
        <p className="text-center font-mono text-[#54A9EB] break-words">
          {seedPhrase}
        </p>
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
