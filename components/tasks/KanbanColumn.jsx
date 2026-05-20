"use client";

import { motion } from "framer-motion";
import TaskCard from "@/components/tasks/TaskCard";

const accentStyles = {
  cyan: "from-pink-400/20 text-pink-300 border-pink-400/20",
  purple: "from-violet-400/20 text-violet-300 border-violet-400/20",
  yellow: "from-orange-400/20 text-orange-300 border-orange-400/20",
  emerald: "from-emerald-400/20 text-emerald-300 border-emerald-400/20",
};

export default function KanbanColumn({ column, index }) {
  const totalPoints = column.tasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="min-h-[620px] rounded-[2rem] border border-white/10 bg-[#0b0614]/58 p-4 backdrop-blur-xl"
    >
      <div
        className={`mb-4 rounded-3xl border bg-gradient-to-br to-transparent p-4 ${accentStyles[column.accent]
          }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white">{column.title}</h2>
            <p className="mt-1 text-xs text-[#a89bb8]">{column.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white">
            {column.tasks.length}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-[#a89bb8]">Sprint Points</span>
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