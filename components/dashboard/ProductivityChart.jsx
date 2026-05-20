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

function buildChartData(tasks, activities) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((day, index) => {
    const taskScore = tasks.filter((task) => task.status === "done").length;
    const activityScore = activities.length;

    return {
      day,
      tasks: Math.max(0, taskScore + index),
      activity: Math.max(0, Math.floor(activityScore / 2) + index * 2),
    };
  });
}

export default function ProductivityChart({ tasks, activities }) {
  const chartData = buildChartData(tasks, activities);

  return (
    <GlassCard className="h-[360px]">
      <div className="mb-5">
        <p className="text-sm text-pink-300">Productivity Signal</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Weekly Momentum
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <BarChart data={chartData}>
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

          <Bar dataKey="tasks" fill="#ff4ecd" radius={[10, 10, 0, 0]} />
          <Bar dataKey="activity" fill="#ff8a3d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}