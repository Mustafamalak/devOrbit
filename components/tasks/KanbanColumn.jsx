"use client";

import { motion } from "framer-motion";
import TaskCard from "@/components/tasks/TaskCard";

const accentStyles = {
  cyan: "from-cyan-400/20 text-cyan-300 border-cyan-400/20",
  purple: "from-purple-400/20 text-purple-300 border-purple-400/20",
  yellow: "from-yellow-400/20 text-yellow-300 border-yellow-400/20",
  emerald: "from-emerald-400/20 text-emerald-300 border-emerald-400/20",
};

export default function KanbanColumn({ column, index }) {
  const totalPoints = column.tasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="min-h-[620px] rounded-4xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl"
    >
      <div
        className={`mb-4 rounded-3xl border bg-linear-to-br to-transparent p-4 ${
          accentStyles[column.accent]
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white">{column.title}</h2>
            <p className="mt-1 text-xs text-slate-400">{column.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold">
            {column.tasks.length}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-400">Sprint Points</span>
          <span className="font-semibold">{totalPoints}</span>
        </div>
      </div>

      <div className="space-y-3">
        {column.tasks.map((task, taskIndex) => (
          <TaskCard key={task.id} task={task} index={taskIndex} />
        ))}
      </div>
    </motion.section>
  );
}