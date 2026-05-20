"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  GitCommit,
  Orbit,
  Sparkles,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm font-medium text-pink-200"
      >
        <Sparkles size={16} />
        3D Developer Productivity Command Center
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.08, duration: 0.6 }}
        className="glow-text max-w-6xl text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
      >
        Turn Your Developer Workflow Into a{" "}
        <span className="text-gradient">Living Universe</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.55 }}
        className="mt-7 max-w-3xl text-lg leading-8 text-[#a89bb8] md:text-xl"
      >
        DevOrbit visualizes projects, tasks, commits, bugs, deadlines, and
        productivity signals inside a futuristic animated command center built
        with Next.js, Tailwind, Framer Motion, Three.js, and Recharts.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.55 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <GlowButton href="/dashboard" className="gap-2 px-6 py-3">
          Enter Command Center
          <ArrowRight size={17} />
        </GlowButton>

        <GlowButton href="/orbit" variant="secondary" className="gap-2 px-6 py-3">
          View 3D Orbit Map
          <Orbit size={17} />
        </GlowButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.6 }}
        className="mt-16 grid w-full max-w-5xl gap-4 md:grid-cols-3"
      >
        {[
          ["3D Project Orbit", "Projects become interactive planets.", Orbit, "text-pink-300"],
          ["Sprint Intelligence", "AI-style summary for workflow health.", BrainCircuit, "text-orange-300"],
          ["Live Activity", "Commits, PRs, bugs, and deployments.", GitCommit, "text-violet-300"],
        ].map(([title, text, Icon, tone]) => (
          <motion.div
            key={title}
            whileHover={{ y: -8, scale: 1.02 }}
            className="premium-card ember-border rounded-3xl p-5 text-left transition"
          >
            <Icon size={22} className={`mb-4 ${tone}`} />
            <h3 className="font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#a89bb8]">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}