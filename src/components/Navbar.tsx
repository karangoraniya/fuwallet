import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <header className="p-6 bg-black">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-blue-600">FuWallet</h1>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
