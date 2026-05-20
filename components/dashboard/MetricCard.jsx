"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Activity,
  Bug,
  CheckCircle2,
  FolderKanban,
  GitCommit,
  ListTodo,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const iconMap = {
  projects: FolderKanban,
  tasks: ListTodo,
  commits: GitCommit,
  bugs: Bug,
  completed: CheckCircle2,
  activity: Activity,
};

const toneStyles = {
  pink: "border-pink-400/20 bg-pink-400/10 text-pink-300",
  orange: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  violet: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  rose: "border-rose-400/20 bg-rose-400/10 text-rose-300",
};

export default function MetricCard({ metric, index }) {
  const Icon = iconMap[metric.icon] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -7, scale: 1.015 }}
    >
      <GlassCard className="relative overflow-hidden scanline">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-orange-500/8 blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm text-[#a89bb8]">{metric.label}</p>

            <h2 className="mt-2 text-4xl font-black text-white">
              <CountUp end={metric.value} duration={1.2} />
              {metric.suffix && (
                <span className="text-2xl text-[#cfc3dd]">
                  {metric.suffix}
                </span>
              )}
            </h2>

            <p className="mt-2 text-sm text-pink-300">{metric.detail}</p>
          </div>

          <div
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl border",
              toneStyles[metric.tone] || toneStyles.pink
            )}
          >
            <Icon size={21} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}