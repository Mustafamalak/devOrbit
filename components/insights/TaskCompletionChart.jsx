"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import GlassCard from "@/components/ui/GlassCard";

const COLORS = ["#ff4ecd", "#ff8a3d", "#7c3aed", "#34d399"];

export default function TaskCompletionChart({ data }) {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-orange-300">Task Distribution</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Sprint Completion Map
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="62%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={100}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0b0614",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "16px",
              color: "#faf7ff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs"
          >
            <span className="text-[#a89bb8]">{item.name}</span>
            <span className="font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}