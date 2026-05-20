"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code2, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Code2,
    title: "Connect project systems",
    text: "Represent each project with health, tasks, commits, bugs, deadlines, and stack data.",
    tone: "text-pink-300",
  },
  {
    icon: ShieldCheck,
    title: "Visualize workflow health",
    text: "Transform plain project management data into dashboards, timelines, analytics, and orbit maps.",
    tone: "text-orange-300",
  },
  {
    icon: CheckCircle2,
    title: "Prioritize sprint execution",
    text: "Use task radar, bug pressure, and AI-style summaries to identify what needs attention first.",
    tone: "text-emerald-300",
  },
  {
    icon: Rocket,
    title: "Move toward deployment",
    text: "Track deployment readiness through frontend polish, responsiveness, SEO, and final review.",
    tone: "text-violet-300",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
        <div>
          <p className="text-sm font-medium text-orange-300">
            Workflow Model
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            From scattered tasks to a{" "}
            <span className="text-gradient">mission-control system</span>
          </h2>

          <p className="mt-5 text-[#a89bb8]">
            Most student projects look like isolated pages. DevOrbit is designed
            as a connected interface where every page tells one product story:
            monitor, analyze, prioritize, and ship.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-pink-400/70 via-orange-400/50 to-transparent" />

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="premium-card ember-border relative rounded-[2rem] p-5 pl-24"
                >
                  <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0b0614]/90 shadow-lg shadow-pink-500/10">
                    <Icon size={22} className={step.tone} />
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#a89bb8]">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}