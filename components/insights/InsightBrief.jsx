"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, CheckCircle2, TriangleAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function InsightBrief({ projects, tasks, activities }) {
  const criticalProjects = projects.filter(
    (project) => project.status === "Critical"
  ).length;

  const warningProjects = projects.filter(
    (project) => project.status === "Warning"
  ).length;

  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const pendingTasks = tasks.length - doneTasks;

  const strongestSignal =
    projects.length > 0
      ? `${projects.length} project system${projects.length > 1 ? "s" : ""
      } actively tracked in MongoDB.`
      : "No projects tracked yet. Create projects to generate better intelligence.";

  const riskSignal =
    criticalProjects > 0
      ? `${criticalProjects} critical project detected. Resolve bugs and blockers first.`
      : warningProjects > 0
        ? `${warningProjects} warning-level project detected. Review sprint risk.`
        : "No major project risk detected from current data.";

  const suggestedAction =
    pendingTasks > 0
      ? `Complete or review ${pendingTasks} pending task${pendingTasks > 1 ? "s" : ""
      } to improve sprint closure.`
      : "Add tasks and activity events to build a stronger productivity signal.";

  const points = [
    {
      icon: CheckCircle2,
      label: "Strongest Signal",
      text: strongestSignal,
      tone: "text-emerald-300",
    },
    {
      icon: TriangleAlert,
      label: "Risk Area",
      text: riskSignal,
      tone:
        criticalProjects > 0 || warningProjects > 0
          ? "text-orange-300"
          : "text-emerald-300",
    },
    {
      icon: BrainCircuit,
      label: "Suggested Action",
      text: suggestedAction,
      tone: "text-pink-300",
    },
  ];

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-orange-500/14 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-pink-300">AI Productivity Brief</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              MongoDB Sprint Intelligence
            </h2>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
            <Bot size={23} />
          </div>
        </div>

        <p className="text-sm leading-7 text-[#cfc3dd]">
          DevOrbit analyzed {projects.length} project
          {projects.length !== 1 ? "s" : ""}, {tasks.length} task
          {tasks.length !== 1 ? "s" : ""}, and {activities.length} activity
          event{activities.length !== 1 ? "s" : ""} from your MongoDB
          workspace.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {points.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-pink-300/25"
              >
                <Icon size={19} className={point.tone} />

                <p className="mt-3 text-sm font-bold text-white">
                  {point.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#a89bb8]">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}