"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Orbit, Sparkles } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function LandingNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-4 z-40 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#0b0614]/70 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 via-orange-400 to-violet-600 text-white shadow-lg shadow-pink-500/30">
          <Sparkles size={20} />
        </div>

        <div>
          <p className="font-black leading-none text-white">DevOrbit</p>
          <p className="text-xs text-[#a89bb8]">Developer Command Center</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-7 text-sm text-[#a89bb8] md:flex">
        <a href="#features" className="transition hover:text-pink-200">
          Features
        </a>
        <a href="#workflow" className="transition hover:text-pink-200">
          Workflow
        </a>
        <a href="#stack" className="transition hover:text-pink-200">
          Stack
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <GlowButton
          href="/orbit"
          variant="secondary"
          className="hidden px-4 py-2 md:inline-flex"
        >
          <Orbit size={16} />
          Orbit
        </GlowButton>

        <GlowButton href="/dashboard" className="px-4 py-2">
          Launch
        </GlowButton>
      </div>
    </motion.header>
  );
}