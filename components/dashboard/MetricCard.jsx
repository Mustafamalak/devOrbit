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
  cyan: "from-cyan-400/20 to-cyan-400/5 text-cyan-300 shadow-cyan-500/20",
  purple:
    "from-purple-400/20 to-purple-400/5 text-purple-300 shadow-purple-500/20",
  red: "from-red-400/20 to-red-400/5 text-red-300 shadow-red-500/20",
  emerald:
    "from-emerald-400/20 to-emerald-400/5 text-emerald-300 shadow-emerald-500/20",
};

export default function MetricCard({ metric, index }) {
  const Icon = icons[metric.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <GlassCard className="group relative overflow-hidden">
        <div
          className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl ${
            tones[metric.tone]
          }`}
        />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">{metric.label}</p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
              <CountUp end={metric.value} duration={1.4} />
            </h2>

            <p className="mt-2 text-sm text-slate-400">{metric.change}</p>
          </div>

          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br shadow-lg ${
              tones[metric.tone]
            }`}
          >
            <Icon size={22} />
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${60 + index * 10}%` }}
            transition={{ delay: 0.35 + index * 0.1, duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}