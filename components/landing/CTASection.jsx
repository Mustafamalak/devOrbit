"use client";

import { motion } from "framer-motion";
import { ArrowRight, Orbit } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="animated-gradient-border relative overflow-hidden rounded-[2.5rem] bg-[#0b0614]/90 p-8 text-center shadow-2xl shadow-pink-950/30 backdrop-blur-2xl md:p-14"
      >
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange-500/18 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/14 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-medium text-pink-200">
            Ready for command mode
          </p>

          <h2 className="glow-text mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            Explore the full DevOrbit experience
          </h2>

          <p className="mt-5 text-[#cfc3dd]">
            Jump into the dashboard, inspect the 3D orbit map, review project
            health, track task flow, and analyze productivity insights.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <GlowButton href="/dashboard" className="gap-2">
              Launch Dashboard
              <ArrowRight size={17} />
            </GlowButton>

            <GlowButton href="/orbit" variant="secondary" className="gap-2">
              Open Orbit Map
              <Orbit size={17} />
            </GlowButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}