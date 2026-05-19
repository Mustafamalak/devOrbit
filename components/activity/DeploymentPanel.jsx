"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Server, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const deployments = [
  {
    env: "Production",
    status: "Stable",
    url: "devorbit.app",
    time: "Ready after final build",
  },
  {
    env: "Preview",
    status: "Live",
    url: "devorbit-preview.vercel.app",
    time: "2 hours ago",
  },
  {
    env: "Local",
    status: "Running",
    url: "localhost:3000",
    time: "Now",
  },
];

export default function DeploymentPanel() {
  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-300">Deployment Matrix</p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Release Channels
          </h2>
        </div>

        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-purple-400/20 bg-purple-400/10 text-purple-300">
          <Server size={21} />
        </div>
      </div>

      <div className="space-y-4">
        {deployments.map((item, index) => (
          <motion.div
            key={item.env}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="rounded-3xl border border-white/10 bg-white/4 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white">{item.env}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.url}</p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={13} />
                {item.status}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Clock3 size={14} />
              {item.time}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
        <div className="flex items-center gap-2 text-cyan-200">
          <Zap size={17} />
          <p className="text-sm font-semibold">Release Insight</p>
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Your frontend system is moving toward deployment readiness. Complete
          activity, insights, landing polish, responsiveness, and final SEO metadata.
        </p>
      </div>
    </GlassCard>
  );
}