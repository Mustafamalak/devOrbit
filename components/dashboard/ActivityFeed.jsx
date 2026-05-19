"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GitMerge, PlusCircle, TriangleAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { recentActivity } from "@/data/mockData";

const icons = {
  merged: GitMerge,
  fixed: CheckCircle2,
  created: PlusCircle,
  warning: TriangleAlert,
};

const colors = {
  merged: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  fixed: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  created: "text-pink-300 bg-pink-400/10 border-pink-400/20",
  warning: "text-amber-300 bg-amber-400/10 border-amber-400/20",
};

export default function ActivityFeed() {
  return (
    <GlassCard>
      <div className="mb-5">
        <p className="text-sm text-pink-300">Live Activity Stream</p>
        <h2 className="mt-1 text-2xl font-bold text-white">
          Recent Engineering Events
        </h2>
      </div>

      <div className="space-y-4">
        {recentActivity.map((item, index) => {
          const Icon = icons[item.status];

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-pink-300/30 hover:bg-white/[0.07]"
            >
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border ${colors[item.status]}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[#a89bb8]">{item.meta}</p>
              </div>

              <p className="shrink-0 text-xs text-[#a89bb8]/70">{item.time}</p>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}