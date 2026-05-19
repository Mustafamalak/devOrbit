"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Activity, Bug, Clock3, Gauge } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const iconMap = {
  "Productivity Score": Gauge,
  "Focus Hours": Clock3,
  "Task Closure": Activity,
  "Bug Pressure": Bug,
};

const toneStyles = {
  cyan: "from-cyan-400/20 text-cyan-300 border-cyan-400/20",
  purple: "from-purple-400/20 text-purple-300 border-purple-400/20",
  emerald: "from-emerald-400/20 text-emerald-300 border-emerald-400/20",
  red: "from-red-400/20 text-red-300 border-red-400/20",
};

export default function InsightMetricCard({ card, index }) {
  const Icon = iconMap[card.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <GlassCard className="relative overflow-hidden">
        <div
          className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br to-transparent blur-2xl ${
            toneStyles[card.tone]
          }`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{card.label}</p>

            <h2 className="mt-2 text-4xl font-black text-white">
              <CountUp end={card.value} duration={1.25} />
              <span className="text-2xl text-slate-300">{card.suffix}</span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">{card.detail}</p>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl border bg-linear-to-br to-transparent ${
              toneStyles[card.tone]
            }`}
          >
            <Icon size={21} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}