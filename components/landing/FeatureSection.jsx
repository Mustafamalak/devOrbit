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
    tone: "text-pink-300",
  },
  {
    icon: Radar,
    title: "Animated Task Radar",
    text: "Track backlog, progress, review, and completed work through a premium Kanban interface.",
    tone: "text-orange-300",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics",
    text: "Convert commits, focus hours, bug trends, and task closure into clean visual insights.",
    tone: "text-violet-300",
  },
  {
    icon: GitPullRequest,
    title: "Engineering Timeline",
    text: "Display commits, PRs, reviews, deployments, and issue events in a GitHub-style activity stream.",
    tone: "text-emerald-300",
  },
  {
    icon: Boxes,
    title: "Project Fleet Management",
    text: "Monitor project health, stack, progress, priority, bug pressure, and delivery readiness.",
    tone: "text-pink-300",
  },
  {
    icon: Activity,
    title: "Mission Control Dashboard",
    text: "A recruiter-friendly dashboard showing engineering velocity, sprint signals, and project health.",
    tone: "text-orange-300",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-medium text-pink-300">Product Features</p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
          Built like a real SaaS, presented like a{" "}
          <span className="text-gradient">frontend showcase</span>
        </h2>

        <p className="mt-5 text-[#a89bb8]">
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
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              whileHover={{ y: -10, scale: 1.015 }}
              className="premium-card ember-border group relative overflow-hidden rounded-[2rem] p-6 transition"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon size={23} className={feature.tone} />
                </div>

                <h3 className="text-xl font-black text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#a89bb8]">
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