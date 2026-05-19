"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function AiSummaryCard() {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-orange-500/16 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-300">AI Mission Brief</p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Sprint Intelligence
            </h2>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
            <Bot size={24} />
          </div>
        </div>

        <p className="text-sm leading-7 text-[#cfc3dd]">
          Your current sprint is moving faster than last week. Commit frequency
          is strong, but task review time is increasing. Prioritize closing
          review-stage cards and stabilize warning projects before adding new
          features.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Focus", "Close review tasks", Sparkles, "text-pink-300"],
            ["Risk", "Bug cluster detected", Zap, "text-orange-300"],
            ["Next", "Deploy dashboard shell", Bot, "text-violet-300"],
          ].map(([label, value, Icon, tone]) => (
            <motion.div
              key={label}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-2xl border border-white/10 bg-white/4.5 p-4 transition hover:border-pink-300/25"
            >
              <Icon size={17} className={`mb-3 ${tone}`} />
              <p className="text-xs text-[#a89bb8]/70">{label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}