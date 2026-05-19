"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function AiSummaryCard() {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-300">AI Mission Brief</p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              Sprint Intelligence
            </h2>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Bot size={24} />
          </div>
        </div>

        <p className="text-sm leading-7 text-slate-300">
          Your current sprint is moving faster than last week. Commit frequency
          is strong, but task review time is increasing. Prioritize closing
          review-stage cards and stabilize warning projects before adding new
          features.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Focus", "Close review tasks", Sparkles],
            ["Risk", "Bug cluster detected", Zap],
            ["Next", "Deploy dashboard shell", Bot],
          ].map(([label, value, Icon]) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/4 p-4"
            >
              <Icon size={17} className="mb-3 text-cyan-300" />
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}