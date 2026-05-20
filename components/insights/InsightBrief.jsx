"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, CheckCircle2, TriangleAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function InsightBrief() {
  const points = [
    {
      icon: CheckCircle2,
      label: "Strongest Signal",
      text: "Commit velocity and task closure improved compared to the previous sprint.",
      tone: "text-emerald-300",
    },
    {
      icon: TriangleAlert,
      label: "Risk Area",
      text: "Review-stage delay is increasing. Merge or reject pending items faster.",
      tone: "text-orange-300",
    },
    {
      icon: BrainCircuit,
      label: "Suggested Action",
      text: "Focus on deployment polish, responsive QA, and final landing page conversion.",
      tone: "text-pink-300",
    },
  ];

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-orange-500/14 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-pink-300">AI Productivity Brief</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              Sprint Intelligence Summary
            </h2>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
            <Bot size={23} />
          </div>
        </div>

        <p className="text-sm leading-7 text-[#cfc3dd]">
          DevOrbit is currently trending toward deployment readiness. The core
          frontend architecture is stable, visual systems are complete, and the
          remaining bottleneck is polish across responsiveness, SEO, and final
          landing-page storytelling.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {points.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-pink-300/25"
              >
                <Icon size={19} className={point.tone} />

                <p className="mt-3 text-sm font-bold text-white">
                  {point.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#a89bb8]">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}