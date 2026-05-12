"use client";

import { motion } from "framer-motion";
import { CalendarClock, CircleDot, Sparkles } from "lucide-react";

function getPriorityStyle(priority) {
  if (priority === "Critical") {
    return "border-red-400/20 bg-red-400/10 text-red-300";
  }

  if (priority === "High") {
    return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  }

  if (priority === "Medium") {
    return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
  }

  return "border-slate-400/20 bg-slate-400/10 text-slate-300";
}

export default function TaskCard({ task, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.36 }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl opacity-0 transition group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/80 text-cyan-300">
            <CircleDot size={16} />
          </div>

          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getPriorityStyle(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <h3 className="text-sm font-bold leading-6 text-white">
          {task.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400">{task.project}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CalendarClock size={14} />
            {task.due}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
            <Sparkles size={13} />
            {task.points} pts
          </div>
        </div>
      </div>
    </motion.article>
  );
}