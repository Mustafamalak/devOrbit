"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { productivityData } from "@/data/mockData";

export default function ProductivityChart() {
  return (
    <GlassCard className="h-[390px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-300">Productivity Signal</p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            Weekly Engineering Output
          </h2>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          +24% velocity
        </div>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <AreaChart data={productivityData}>
          <defs>
            <linearGradient id="commits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="tasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

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
          <Area
            type="monotone"
            dataKey="commits"
            stroke="#22d3ee"
            strokeWidth={3}
            fill="url(#commits)"
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#tasks)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}