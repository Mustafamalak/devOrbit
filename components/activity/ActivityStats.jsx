"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Activity, GitCommit, GitPullRequest, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { activityStats } from "@/data/mockData";

const icons = [GitCommit, GitPullRequest, Activity, Rocket];

export default function ActivityStats() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {activityStats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <h2 className="mt-2 text-4xl font-black text-white">
                    <CountUp end={stat.value} duration={1.2} />
                  </h2>
                  <p className="mt-2 text-sm text-cyan-300">{stat.detail}</p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Icon size={20} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </section>
  );
}