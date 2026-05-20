"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TaskCard from "@/components/tasks/TaskCard";

const columnStyles = {
  backlog: "border-pink-400/20 bg-pink-400/10 text-pink-200",
  progress: "border-orange-400/20 bg-orange-400/10 text-orange-200",
  review: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  done: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
};

export default function KanbanColumn({ column, tasks }) {
  return (
    <motion.section
      layout
      className="premium-card min-h-[32rem] rounded-[2rem] p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-[#a89bb8]">{column.subtitle}</p>
          <h2 className="mt-1 text-xl font-black text-white">
            {column.title}
          </h2>
        </div>

        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold",
            columnStyles[column.id]
          )}
        >
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-5 text-center text-sm text-[#a89bb8]">
            No tasks in this lane.
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))
        )}
      </div>
    </motion.section>
  );
}