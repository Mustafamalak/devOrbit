"use client";

import { ArrowRight, Orbit } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl md:p-14">
        <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-medium text-cyan-200">
            Ready for command mode
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            Explore the full DevOrbit experience
          </h2>

          <p className="mt-5 text-slate-300">
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
      </div>
    </section>
  );
}