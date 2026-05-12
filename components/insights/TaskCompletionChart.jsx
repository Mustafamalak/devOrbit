"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { taskCompletionData } from "@/data/mockData";

const COLORS = ["#22d3ee", "#8b5cf6", "#f59e0b", "#10b981"];

export default function TaskCompletionChart() {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-purple-300">Task Distribution</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Sprint Completion Map
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="62%">
        <PieChart>
          <Pie
            data={taskCompletionData}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={100}
            paddingAngle={5}
          >
            {taskCompletionData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "16px",
              color: "#f8fafc",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2">
        {taskCompletionData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs"
          >
            <span className="text-slate-400">{item.name}</span>
            <span className="font-bold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}