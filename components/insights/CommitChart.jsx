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
import { weeklyCommitData } from "@/data/mockData";

export default function CommitChart() {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-cyan-300">Commit Intelligence</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Weekly Code Output
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <BarChart data={weeklyCommitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.13)" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "16px",
              color: "#f8fafc",
            }}
          />
          <Bar dataKey="commits" fill="#22d3ee" radius={[10, 10, 0, 0]} />
          <Bar dataKey="pullRequests" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}