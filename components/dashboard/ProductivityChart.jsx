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
          <p className="text-sm text-pink-300">Productivity Signal</p>
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
            <linearGradient id="commitsEmber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4ecd" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ff4ecd" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="tasksEmber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff8a3d" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ff8a3d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="day" stroke="#a89bb8" />
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
            dataKey="commits"
            stroke="#ff4ecd"
            strokeWidth={3}
            fill="url(#commitsEmber)"
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#ff8a3d"
            strokeWidth={3}
            fill="url(#tasksEmber)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}