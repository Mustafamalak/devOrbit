"use client";

import { Bot, CheckCircle2, Sparkles, TriangleAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function AiSummaryCard({ projects, tasks, activities }) {
  const criticalProjects = projects.filter(
    (project) => project.status === "Critical"
  ).length;

  const warningProjects = projects.filter(
    (project) => project.status === "Warning"
  ).length;

  const pendingTasks = tasks.filter((task) => task.status !== "done").length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;

  let summary =
    "Your workspace is ready. Add projects and tasks to generate a stronger sprint summary.";

  if (projects.length > 0) {
    summary = `You are tracking ${projects.length} project${projects.length > 1 ? "s" : ""
      }, ${pendingTasks} pending task${pendingTasks !== 1 ? "s" : ""
      }, and ${activities.length} activity event${activities.length !== 1 ? "s" : ""
      }.`;
  }

  const recommendations = [
    criticalProjects > 0
      ? `${criticalProjects} critical project needs immediate cleanup.`
      : "No critical projects detected.",
    warningProjects > 0
      ? `${warningProjects} warning-level project should be reviewed.`
      : "Project risk is currently manageable.",
    doneTasks > 0
      ? `${doneTasks} task${doneTasks > 1 ? "s" : ""} already completed.`
      : "Move completed work to Done for better reporting.",
  ];

  return (
    <GlassCard className="relative h-full overflow-hidden">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-orange-500/14 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-pink-300">AI Sprint Brief</p>
            <h2 className="mt-1 text-2xl font-black text-white">
              Workspace Intelligence
            </h2>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
            <Bot size={23} />
          </div>
        </div>

        <p className="text-sm leading-7 text-[#cfc3dd]">{summary}</p>

        <div className="mt-6 space-y-3">
          {recommendations.map((item, index) => {
            const Icon = index === 0 && criticalProjects > 0 ? TriangleAlert : CheckCircle2;

            return (
              <div
                key={item}
                className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-4"
              >
                <Icon
                  size={18}
                  className={
                    index === 0 && criticalProjects > 0
                      ? "text-rose-300"
                      : "text-emerald-300"
                  }
                />

                <p className="text-sm leading-6 text-[#cfc3dd]">{item}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-3xl border border-pink-400/20 bg-pink-400/10 p-4">
          <div className="flex items-center gap-2 text-pink-200">
            <Sparkles size={17} />
            <p className="text-sm font-semibold">Next AI Upgrade</p>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#cfc3dd]">
            Later we will connect this card to a real AI endpoint that summarizes
            your projects, tasks, commits, and bugs automatically.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}