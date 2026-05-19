"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, TriangleAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { projectHealth } from "@/data/mockData";

function getStatusStyle(status) {
  if (status === "Healthy") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Warning") {
    return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
  }

  return "border-red-400/20 bg-red-400/10 text-red-300";
}

export default function ProjectHealth() {
  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-300">Project Health Matrix</p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            Active Systems
          </h2>
        </div>

        <ShieldCheck className="text-cyan-300" size={24} />
      </div>

      <div className="space-y-4">
        {projectHealth.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-300/30 hover:bg-white/6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu size={17} className="text-cyan-300" />
                  <h3 className="font-semibold text-white">{project.name}</h3>
                </div>

                <p className="mt-1 text-sm text-slate-400">{project.type}</p>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>Health Score</span>
                <span>{project.health}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.health}%` }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                  className="h-full rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-3xl border border-yellow-400/15 bg-yellow-400/8 p-4 text-sm text-slate-300">
        <TriangleAlert size={18} className="mt-0.5 text-yellow-300" />
        <p>
          DevOrbit has reduced testing coverage. Suggested action: complete
          Orbit Map and Insights page before deployment.
        </p>
      </div>
    </GlassCard>
  );
}