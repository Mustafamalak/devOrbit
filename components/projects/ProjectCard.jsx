"use client";

import { motion } from "framer-motion";
import {
  Bug,
  CalendarDays,
  Edit3,
  GitCommit,
  Layers3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DangerDeleteButton from "@/components/ui/DangerDeleteButton";

const statusStyles = {
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Warning: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  Critical: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  Prototype: "border-violet-400/20 bg-violet-400/10 text-violet-300",
};

export default function ProjectCard({ project, index, onEdit, onDelete }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0614]/70 p-5 shadow-2xl shadow-pink-950/10 backdrop-blur-xl transition hover:border-pink-300/25"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl transition group-hover:bg-pink-500/20" />
      <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
              <Layers3 size={22} />
            </div>

            <p className="text-xs text-pink-300">{project.category}</p>

            <h2 className="mt-1 text-2xl font-black text-white">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold",
                statusStyles[project.status] || statusStyles.Prototype
              )}
            >
              {project.status}
            </span>

            <button
              type="button"
              onClick={() => onEdit?.(project)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#a89bb8] transition hover:border-pink-300/30 hover:text-pink-200"
              title="Edit project"
            >
              <Edit3 size={15} />
            </button>

            <DangerDeleteButton
              title="Delete project"
              onClick={() => onDelete?.(project)}
            />
          </div>
        </div>

        <p className="min-h-[3.5rem] text-sm leading-6 text-[#a89bb8]">
          {project.description || "No description provided."}
        </p>

        <div className="my-5">
          <div className="mb-2 flex items-center justify-between text-xs text-[#a89bb8]">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {(project.stack || []).slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            <p className="text-xs text-[#a89bb8]">Tasks</p>
            <p className="mt-1 text-xl font-black text-white">
              {project.tasks}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-center gap-1.5 text-xs text-[#a89bb8]">
              <Bug size={13} />
              Bugs
            </div>
            <p className="mt-1 text-xl font-black text-rose-300">
              {project.bugs}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-center gap-1.5 text-xs text-[#a89bb8]">
              <GitCommit size={13} />
              Commits
            </div>
            <p className="mt-1 text-xl font-black text-emerald-300">
              {project.commits}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#a89bb8]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} />
            {project.deadline}
          </span>

          <span>{project.priority} priority</span>
        </div>
      </div>
    </motion.article>
  );
}