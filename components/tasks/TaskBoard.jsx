"use client";

import { motion } from "framer-motion";
import { Radar, Search, SlidersHorizontal } from "lucide-react";
import KanbanColumn from "@/components/tasks/KanbanColumn";
import GlassCard from "@/components/ui/GlassCard";
import { taskColumns } from "@/data/mockData";

export default function TaskBoard() {
  const totalTasks = taskColumns.reduce(
    (sum, column) => sum + column.tasks.length,
    0
  );

  const totalPoints = taskColumns.reduce((sum, column) => {
    return sum + column.tasks.reduce((acc, task) => acc + task.points, 0);
  }, 0);

  const criticalTasks = taskColumns.reduce((sum, column) => {
    return (
      sum + column.tasks.filter((task) => task.priority === "Critical").length
    );
  }, 0);

  return (
    <div>
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          ["Total Tasks", totalTasks, "Across active sprint", "text-pink-300"],
          ["Sprint Points", totalPoints, "Estimated workload", "text-orange-300"],
          ["Critical Tasks", criticalTasks, "Needs priority execution", "text-rose-300"],
        ].map(([label, value, description, tone], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: index * 0.07 }}
          >
            <GlassCard className="p-5">
              <p className={`text-sm ${tone}`}>{label}</p>
              <h2 className="mt-2 text-4xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-[#a89bb8]">{description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </section>

      <section className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#a89bb8] transition focus-within:border-pink-300/30 xl:w-96">
          <Search size={18} className="text-pink-300" />
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#a89bb8]/60"
            placeholder="Search task radar..."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15">
            <Radar size={16} />
            Sprint Radar
          </button>

          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#cfc3dd] transition hover:border-pink-300/30 hover:text-white">
            <SlidersHorizontal size={16} />
            Priority View
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {taskColumns.map((column, index) => (
          <KanbanColumn key={column.id} column={column} index={index} />
        ))}
      </section>
    </div>
  );
}