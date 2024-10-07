import Link from "next/link";
import { Button } from "@/components/ui/button";

const InitialScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E1E] text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-[#54A9EB]">
        Welcome to TeleWallet
      </h1>
      <div className="space-y-4 w-full max-w-xs">
        <Link href="/create-wallet" className="w-full">
          <Button className="w-full bg-[#54A9EB] hover:bg-[#4A94D1] text-white">
            Create New Wallet
          </Button>
        </Link>
        <Link href="/import-wallet" className="w-full">
          <Button
            variant="outline"
            className="w-full border-[#54A9EB] text-[#54A9EB] hover:bg-[#54A9EB] hover:text-white"
          >
            Import Existing Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InitialScreen;
