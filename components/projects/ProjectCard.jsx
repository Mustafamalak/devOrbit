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
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-rose-400/20 bg-rose-400/10 text-rose-300";
}

function getPriorityStyle(priority) {
  if (priority === "Critical") {
    return "text-rose-300";
  }

  if (priority === "High") {
    return "text-pink-300";
  }

  if (priority === "Medium") {
    return "text-orange-300";
  }

  return "text-[#a89bb8]";
}

function StatusIcon({ status }) {
  if (status === "Healthy") return <ShieldCheck size={17} />;
  if (status === "Warning") return <TriangleAlert size={17} />;
  return <Bug size={17} />;
}

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: index * 0.06, duration: 0.42 }}
      whileHover={{ y: -8, scale: 1.012 }}
    >
      <GlassCard className="group relative h-full overflow-hidden p-0 scanline">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-pink-500/12 blur-3xl transition group-hover:bg-pink-500/20" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/18" />
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-3xl" />

        <div className="relative p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-200">
                <Layers3 size={14} />
                {project.category}
              </div>

              <h2 className="text-2xl font-black text-white">
                {project.name}
              </h2>

              <p className="mt-2 min-h-[68px] text-sm leading-6 text-[#a89bb8]">
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
              <span className="text-[#a89bb8]">Build Progress</span>
              <span className="font-semibold text-white">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ delay: 0.2 + index * 0.06, duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600"
              />
            </div>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
              <ListChecks size={16} className="mb-2 text-pink-300" />
              <p className="text-xs text-[#a89bb8]/70">Tasks</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.tasks}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
              <Bug size={16} className="mb-2 text-rose-300" />
              <p className="text-xs text-[#a89bb8]/70">Bugs</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.bugs}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
              <GitCommit size={16} className="mb-2 text-emerald-300" />
              <p className="text-xs text-[#a89bb8]/70">Commits</p>
              <p className="mt-1 text-lg font-black text-white">
                {project.commits}
              </p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#140c23]/80 px-3 py-1 text-xs text-[#cfc3dd]"
              >
                <Code2 size={12} />
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-sm text-[#a89bb8]">
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