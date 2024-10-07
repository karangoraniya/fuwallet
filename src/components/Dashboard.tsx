import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const balance = 100.5; // Example balance

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#54A9EB]">
          TeleWallet Dashboard
        </h1>
      </header>
      <main className="flex-grow">
        <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6">
          <h2 className="text-xl mb-2">Your Balance</h2>
          <p className="text-3xl font-bold text-[#54A9EB]">{balance} GRAM</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-[#54A9EB] hover:bg-[#4A94D1] text-white">
            Send
          </Button>
          <Button className="bg-[#54A9EB] hover:bg-[#4A94D1] text-white">
            Receive
          </Button>
        </div>
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 TeleWallet. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
