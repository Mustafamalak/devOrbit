"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

function getStatusStyle(status) {
  if (status === "Healthy") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Warning") {
    return "border-orange-400/20 bg-orange-400/10 text-orange-300";
  }

  if (status === "Critical") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  }

  return "border-violet-400/20 bg-violet-400/10 text-violet-300";
}

export default function ProjectHealth({ projects }) {
  const visibleProjects = projects.slice(0, 5);

  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-pink-300">Project Health</p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Active Systems
          </h2>
        </div>

        <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-200">
          MongoDB
        </span>
      </div>

      <div className="space-y-4">
        {visibleProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-6 text-center">
            <p className="font-semibold text-white">No projects yet</p>
            <p className="mt-2 text-sm text-[#a89bb8]">
              Create your first project from the Projects page.
            </p>
          </div>
        ) : (
          visibleProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, x: -14, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/10 bg-white/[0.045] p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white">{project.name}</h3>
                  <p className="mt-1 text-xs text-[#a89bb8]">
                    {project.category}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mb-2 flex justify-between text-xs text-[#a89bb8]">
                <span>Health</span>
                <span>{project.health}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600"
                  style={{ width: `${project.health}%` }}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </GlassCard>
  );
}