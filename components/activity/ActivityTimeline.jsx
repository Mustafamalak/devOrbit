"use client";

import { motion } from "framer-motion";
import {
  Bug,
  CheckCircle2,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { activityTimelineData } from "@/data/mockData";

const typeIcons = {
  commit: GitCommit,
  pull_request: GitPullRequest,
  issue: TriangleAlert,
  deploy: Rocket,
  review: ShieldCheck,
  bug: Bug,
};

const statusStyles = {
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  merged: "border-purple-400/20 bg-purple-400/10 text-purple-300",
  warning: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  reviewed: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  fixed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
};

function getStatusLabel(status) {
  if (status === "success") return "Success";
  if (status === "merged") return "Merged";
  if (status === "warning") return "Warning";
  if (status === "reviewed") return "Reviewed";
  if (status === "fixed") return "Fixed";
  return status;
}

export default function ActivityTimeline() {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute left-9 top-24 bottom-8 w-px bg-linear-to-b from-cyan-400/50 via-purple-400/30 to-transparent" />

      <div className="mb-7">
        <p className="text-sm text-cyan-300">Engineering Timeline</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Live Development Activity
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          A chronological stream of commits, issues, pull requests, reviews, and deployments.
        </p>
      </div>

      <div className="space-y-5">
        {activityTimelineData.map((item, index) => {
          const Icon = typeIcons[item.type];

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="relative pl-14"
            >
              <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-2xl border border-cyan-400/20 bg-slate-950 text-cyan-300 shadow-lg shadow-cyan-500/10">
                <Icon size={18} />
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/4 p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.07]">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[item.status]
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
                    {item.project}
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
                    {item.branch}
                  </span>

                  <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1">
                    {item.actor}
                  </span>

                  <span className="ml-auto text-slate-500">{item.time}</span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </GlassCard>
  );
}