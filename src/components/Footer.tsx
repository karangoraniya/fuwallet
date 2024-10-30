"use client";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

          // Add a small buffer (20px) to account for potential rounding
          const isFooterAtBottom =
            windowHeight + scrollTop >= documentHeight - 20;

          setIsAtBottom(isFooterAtBottom);
          setIsScrolling(false);
        });
        setIsScrolling(true);
      }
    };

    // Initial check
    handleScroll();

    // Add passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle window resize
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isScrolling]);

  return (
    <footer
      className={`
        fixed bottom-0 
        w-full 
        p-4 
        text-center 
        transition-all 
        duration-300 
        ease-in-out 
        z-40
        ${
          isAtBottom
            ? "bg-transparent text-blue-600"
            : "bg-gray-800/80 text-white backdrop-blur-sm"
        }
      `}
    >
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Made with{" "}
          <span className="inline-block animate-pulse">💖</span> by
          CryptoKarigar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
