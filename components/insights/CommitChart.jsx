"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";

export default function CommitChart({ data }) {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-pink-300">Commit Intelligence</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Project Code Output
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#a89bb8" />
          <YAxis stroke="#a89bb8" />
          <Tooltip
            contentStyle={{
              background: "#0b0614",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "16px",
              color: "#faf7ff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            }}
          />
          <Bar dataKey="commits" fill="#ff4ecd" radius={[10, 10, 0, 0]} />
          <Bar dataKey="tasks" fill="#ff8a3d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}