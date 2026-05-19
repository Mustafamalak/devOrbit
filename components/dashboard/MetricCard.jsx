"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Activity, Bug, FolderKanban, GitCommit } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const icons = {
  "Active Projects": FolderKanban,
  "Open Tasks": Activity,
  "Bugs Detected": Bug,
  "Weekly Commits": GitCommit,
};

const tones = {
  cyan: "from-pink-400/24 to-pink-400/5 text-pink-300 shadow-pink-500/20",
  purple:
    "from-violet-400/24 to-violet-400/5 text-violet-300 shadow-violet-500/20",
  red: "from-rose-400/24 to-rose-400/5 text-rose-300 shadow-rose-500/20",
  emerald:
    "from-emerald-400/24 to-emerald-400/5 text-emerald-300 shadow-emerald-500/20",
};

export default function MetricCard({ metric, index }) {
  const Icon = icons[metric.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.015 }}
    >
      <GlassCard className="group relative overflow-hidden scanline">
        <div
          className={`absolute right-0 top-0 h-36 w-36 rounded-full bg-linear-to-br blur-2xl ${
            tones[metric.tone]
          }`}
        />

        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm text-[#a89bb8]">{metric.label}</p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
              <CountUp end={metric.value} duration={1.4} />
            </h2>

            <p className="mt-2 text-sm text-[#a89bb8]">{metric.change}</p>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br shadow-lg ${
              tones[metric.tone]
            }`}
          >
            <Icon size={22} />
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#140c23]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${60 + index * 10}%` }}
            transition={{ delay: 0.35 + index * 0.1, duration: 0.8 }}
            className="h-full rounded-full bg-linear-to-r from-pink-400 via-orange-400 to-violet-600"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}