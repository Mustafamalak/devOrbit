"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Boxes,
  GitPullRequest,
  Orbit,
  Radar,
} from "lucide-react";

const features = [
  {
    icon: Orbit,
    title: "Interactive 3D Orbit Map",
    text: "Visualize every project as a living planet orbiting around your developer core.",
  },
  {
    icon: Radar,
    title: "Animated Task Radar",
    text: "Track backlog, progress, review, and completed work through a premium Kanban interface.",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics",
    text: "Convert commits, focus hours, bug trends, and task closure into clean visual insights.",
  },
  {
    icon: GitPullRequest,
    title: "Engineering Timeline",
    text: "Display commits, PRs, reviews, deployments, and issue events in a GitHub-style activity stream.",
  },
  {
    icon: Boxes,
    title: "Project Fleet Management",
    text: "Monitor project health, stack, progress, priority, bug pressure, and delivery readiness.",
  },
  {
    icon: Activity,
    title: "Mission Control Dashboard",
    text: "A recruiter-friendly dashboard showing engineering velocity, sprint signals, and project health.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-medium text-cyan-300">Product Features</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
          Built like a real SaaS, presented like a{" "}
          <span className="text-gradient">frontend showcase</span>
        </h2>
        <p className="mt-5 text-slate-400">
          DevOrbit is frontend-first, but it is structured like a scalable
          product: reusable components, page-level systems, clean mock data,
          analytics, activity streams, and 3D visualization.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/7"
            >
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Icon size={23} />
                </div>

                <h3 className="text-xl font-black text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}