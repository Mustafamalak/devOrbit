"use client";

import { motion } from "framer-motion";
import { CalendarDays, GitBranch, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityStyles = {
  Low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Medium: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  High: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  Critical: "border-rose-400/20 bg-rose-400/10 text-rose-300",
};

export default function TaskCard({ task, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-lg shadow-black/10 transition hover:border-pink-300/25 hover:bg-white/[0.07]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold leading-6 text-white">{task.title}</h3>

        <button
          type="button"
          className="text-[#a89bb8] transition hover:text-pink-200"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {task.description && (
        <p className="mb-3 line-clamp-2 text-xs leading-5 text-[#a89bb8]">
          {task.description}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {(task.tags || []).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-pink-400/20 bg-pink-400/10 px-2.5 py-1 text-[11px] text-pink-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            priorityStyles[task.priority] || priorityStyles.Medium
          )}
        >
          {task.priority}
        </span>

        <span className="rounded-full border border-white/10 bg-[#140c23] px-2.5 py-1 text-[11px] text-[#cfc3dd]">
          {task.points} pts
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-[11px] text-[#a89bb8]">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} />
          {task.dueDate}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <GitBranch size={13} />
          {task.projectName}
        </span>
      </div>
    </motion.article>
  );
}