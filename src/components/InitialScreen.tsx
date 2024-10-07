"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const InitialScreen = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const checkWalletData = () => {
      const seedPhrase = localStorage.getItem("seedPhrase");
      const walletAddress = localStorage.getItem("walletAddress");
      const privateKey = localStorage.getItem("privateKey");

      if (seedPhrase && walletAddress && privateKey) {
        router.push("/dashboard");
      }
    };

    checkWalletData();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [router]);

  return (
    <div>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 50%)`,
        }}
      />
      <div className="">
        <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden h-[80vh]">
          <div className="text-center z-10">
            <h2 className="md:text-5xl text-2xl font-bold mb-6 text-blue-800 ">
              Welcome to the Future of Digital Finance
            </h2>
            <p className="md:text-xl text-lg mb-8 text-blue-600">
              Secure, fast, and easy-to-use digital wallet for the modern world.
            </p>
            <div className="flex md:space-x-4 justify-center md:flex-row flex-col items-center gap-5">
              <Link href="/create-wallet">
                <Button className="p-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                  Create Wallet
                </Button>
              </Link>
              <Link href="/import-wallet">
                <Button className="p-5 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                  Import Wallet
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InitialScreen;
