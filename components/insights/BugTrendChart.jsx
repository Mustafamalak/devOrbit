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
import { bugTrendData } from "@/data/mockData";

export default function BugTrendChart() {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-red-300">Quality Signal</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Bug Trend vs Resolution
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <AreaChart data={bugTrendData}>
          <defs>
            <linearGradient id="bugs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.13)" />
          <XAxis dataKey="sprint" stroke="#64748b" />
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
            dataKey="bugs"
            stroke="#ef4444"
            strokeWidth={3}
            fill="url(#bugs)"
          />

          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#resolved)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}