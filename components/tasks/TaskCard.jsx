"use client";

import { motion } from "framer-motion";
import { CalendarClock, CircleDot, Sparkles } from "lucide-react";

function getPriorityStyle(priority) {
  if (priority === "Critical") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  }

  if (priority === "High") {
    return "border-pink-400/20 bg-pink-400/10 text-pink-300";
  }

  if (priority === "Medium") {
    return "border-orange-400/20 bg-orange-400/10 text-orange-300";
  }

  return "border-white/15 bg-white/5 text-[#cfc3dd]";
}

export default function TaskCard({ task, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: index * 0.06, duration: 0.36 }}
      whileHover={{ y: -6, scale: 1.018 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-lg shadow-black/10 transition hover:border-pink-300/30 hover:bg-white/[0.075]"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/12 blur-2xl opacity-0 transition group-hover:opacity-100" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-orange-500/10 blur-2xl opacity-0 transition group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[#0b0614]/85 text-pink-300">
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

        <p className="mt-2 text-xs text-[#a89bb8]">{task.project}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-[#140c23]/70 px-2.5 py-1 text-[11px] text-[#cfc3dd]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-[#a89bb8]">
            <CalendarClock size={14} />
            {task.due}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-300">
            <Sparkles size={13} />
            {task.points} pts
          </div>
        </div>
      </div>
    </motion.article>
  );
}