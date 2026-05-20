"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06030f]">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <motion.div
        animate={{
          x: [0, 90, 0],
          y: [0, -70, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-pink-500/22 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 90, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-8%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-orange-500/18 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 45, 0],
          scale: [1, 1.13, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-12%] left-[32%] h-[26rem] w-[26rem] rounded-full bg-violet-600/18 blur-3xl"
      />

      <motion.div
        animate={{
          opacity: [0.18, 0.38, 0.18],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[42%] top-[35%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,3,15,0.42)_44%,rgba(6,3,15,0.96)_100%)]" />
    </div>
  );
}