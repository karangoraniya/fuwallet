"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <motion.div
        className="text-xl font-bold animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text bg-300% text-transparent"
        animate={{
          opacity: [1, 0.5, 1], // Pulsing effect
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity, // Loops the animation indefinitely
        }}
      >
        FUWALLET
      </motion.div>
    </div>
  );
}
