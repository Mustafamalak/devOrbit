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

export default function FocusHoursChart({ data }) {
  return (
    <GlassCard className="h-[380px]">
      <div className="mb-5">
        <p className="text-sm text-emerald-300">Activity Analytics</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Weekly Activity Pulse
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <LineChart data={data}>
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

          <Line
            type="monotone"
            dataKey="events"
            stroke="#34d399"
            strokeWidth={4}
            dot={{ r: 5, fill: "#34d399" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}