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
  cyan: "from-pink-400/24 text-pink-300 border-pink-400/20",
  purple: "from-violet-400/24 text-violet-300 border-violet-400/20",
  emerald: "from-emerald-400/24 text-emerald-300 border-emerald-400/20",
  red: "from-rose-400/24 text-rose-300 border-rose-400/20",
};

export default function InsightMetricCard({ card, index }) {
  const Icon = iconMap[card.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -7, scale: 1.015 }}
    >
      <GlassCard className="relative overflow-hidden scanline">
        <div
          className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-2xl ${toneStyles[card.tone]
            }`}
        />

        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#a89bb8]">{card.label}</p>

            <h2 className="mt-2 text-4xl font-black text-white">
              <CountUp end={card.value} duration={1.25} />
              <span className="text-2xl text-[#cfc3dd]">{card.suffix}</span>
            </h2>

            <p className="mt-2 text-sm text-[#a89bb8]">{card.detail}</p>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl border bg-gradient-to-br to-transparent ${toneStyles[card.tone]
              }`}
          >
            <Icon size={21} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}