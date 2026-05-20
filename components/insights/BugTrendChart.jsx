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
        <p className="text-sm text-rose-300">Quality Signal</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Bug Trend vs Resolution
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <AreaChart data={bugTrendData}>
          <defs>
            <linearGradient id="bugsEmber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="resolvedEmber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="sprint" stroke="#a89bb8" />
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

          <Area
            type="monotone"
            dataKey="bugs"
            stroke="#fb7185"
            strokeWidth={3}
            fill="url(#bugsEmber)"
          />

          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#34d399"
            strokeWidth={3}
            fill="url(#resolvedEmber)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}