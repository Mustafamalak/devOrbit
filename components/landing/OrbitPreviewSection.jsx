"use client";

import { motion } from "framer-motion";
import { Activity, Bug, GitCommit, Orbit } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function OrbitPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl md:p-10">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
          <div>
            <p className="text-sm font-medium text-cyan-300">
              Highlight Feature
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
              The 3D orbit map is the{" "}
              <span className="text-gradient">resume hook</span>
            </h2>

            <p className="mt-5 text-slate-400">
              Recruiters will not remember another normal dashboard. They will
              remember a project where engineering systems are visualized as a
              living 3D universe.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Projects", "5 orbiting systems", Orbit],
                ["Bugs", "Live pressure signal", Bug],
                ["Commits", "126 weekly events", GitCommit],
              ].map(([label, value, Icon]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/4 p-4"
                >
                  <Icon size={19} className="mb-3 text-cyan-300" />
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <GlowButton href="/orbit" className="gap-2">
                Open Orbit Map
                <Activity size={17} />
              </GlowButton>
            </div>
          </div>

          <div className="relative grid min-h-[420px] place-items-center rounded-4xl border border-white/10 bg-black/30">
            <div className="absolute inset-0 grid-bg opacity-25" />

            <div className="relative grid h-32 w-32 place-items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-2xl shadow-cyan-500/30">
              <div className="h-20 w-20 rounded-full bg-cyan-400/80 blur-sm" />
              <div className="absolute text-xs font-bold text-slate-950">
                CORE
              </div>
            </div>

            {[150, 230, 310].map((size, index) => (
              <div
                key={size}
                className="absolute rounded-full border border-slate-600/40"
                style={{ height: size, width: size }}
              />
            ))}

            {[
              ["TeamFinder", "top-14 right-28", "bg-cyan-400"],
              ["DevOrbit", "bottom-20 right-20", "bg-purple-400"],
              ["PsycheMail", "bottom-24 left-24", "bg-red-400"],
              ["CampusPulse", "top-24 left-20", "bg-emerald-400"],
            ].map(([name, position, color], index) => (
              <motion.div
                key={name}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${position}`}
              >
                <div className={`h-7 w-7 rounded-full ${color} shadow-lg`} />
                <div className="mt-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs text-white backdrop-blur">
                  {name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}