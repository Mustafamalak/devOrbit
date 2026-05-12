"use client";

import { motion } from "framer-motion";
import {
  Bug,
  CalendarDays,
  Code2,
  GitCommit,
  Layers3,
  ListChecks,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

function getStatusStyle(status) {
  if (status === "Healthy") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Warning") {
    return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
  }

  return "border-red-400/20 bg-red-400/10 text-red-300";
}

function getPriorityStyle(priority) {
  if (priority === "Critical") {
    return "text-red-300";
  }

  if (priority === "High") {
    return "text-cyan-300";
  }

  if (priority === "Medium") {
    return "text-yellow-300";
  }

  return "text-slate-400";
}

function StatusIcon({ status }) {
  if (status === "Healthy") return <ShieldCheck size={17} />;
  if (status === "Warning") return <TriangleAlert size={17} />;
  return <Bug size={17} />;
}

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.42 }}
      whileHover={{ y: -8 }}
    >
      <GlassCard className="group relative h-full overflow-hidden p-0">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

        <div className="relative p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                <Layers3 size={14} />
                {project.category}
              </div>

              <h2 className="text-2xl font-black text-white">
                {project.name}
              </h2>

              <p className="mt-2 min-h-[68px] text-sm leading-6 text-slate-400">
                {project.description}
              </p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                project.status
              )}`}
            >
              <StatusIcon status={project.status} />
              {project.status}
            </span>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-400">Build Progress</span>
              <span className="font-semibold text-white">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ delay: 0.2 + index * 0.06, duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
              />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <ListChecks size={16} className="mb-2 text-cyan-300" />
              <p className="text-xs text-slate-500">Tasks</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.tasks}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <Bug size={16} className="mb-2 text-red-300" />
              <p className="text-xs text-slate-500">Bugs</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.bugs}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <GitCommit size={16} className="mb-2 text-emerald-300" />
              <p className="text-xs text-slate-500">Commits</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.commits}
              </p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-300"
              >
                <Code2 size={12} />
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarDays size={16} />
              {project.deadline}
            </div>

            <div className={`text-sm font-semibold ${getPriorityStyle(project.priority)}`}>
              {project.priority} Priority
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}