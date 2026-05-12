"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { focusHoursData } from "@/data/mockData";

export default function FocusHoursChart() {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-emerald-300">Deep Work Analytics</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Focus Hours
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <LineChart data={focusHoursData}>
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

          <Line
            type="monotone"
            dataKey="hours"
            stroke="#10b981"
            strokeWidth={4}
            dot={{ r: 5, fill: "#10b981" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}