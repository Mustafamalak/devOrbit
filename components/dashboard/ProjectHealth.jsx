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
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-rose-400/20 bg-rose-400/10 text-rose-300";
}

export default function ProjectHealth() {
  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-violet-300">Project Health Matrix</p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            Active Systems
          </h2>
        </div>

        <ShieldCheck className="text-pink-300" size={24} />
      </div>

      <div className="space-y-4">
        {projectHealth.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -16, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-pink-300/30 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu size={17} className="text-pink-300" />
                  <h3 className="font-semibold text-white">{project.name}</h3>
                </div>

                <p className="mt-1 text-sm text-[#a89bb8]">{project.type}</p>
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
                  className="rounded-full border border-white/10 bg-[#140c23]/80 px-3 py-1 text-xs text-[#cfc3dd]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs text-[#a89bb8]">
                <span>Health Score</span>
                <span>{project.health}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.health}%` }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                  className="h-full rounded-full bg-linear-to-r from-pink-400 via-orange-400 to-violet-600"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-3xl border border-amber-400/15 bg-amber-400/8 p-4 text-sm text-[#cfc3dd]">
        <TriangleAlert size={18} className="mt-0.5 text-amber-300" />
        <p>
          DevOrbit has reduced testing coverage. Suggested action: complete
          Orbit Map and Insights page before deployment.
        </p>
      </div>
    </GlassCard>
  );
}