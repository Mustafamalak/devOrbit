"use client";

import { motion } from "framer-motion";
import {
  Bug,
  CheckCircle2,
  GitCommit,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  TriangleAlert,
  FolderPlus,
  ListTodo,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const typeIcons = {
  commit: GitCommit,
  pull_request: GitPullRequest,
  issue: TriangleAlert,
  deploy: Rocket,
  review: ShieldCheck,
  bug: Bug,
  task: ListTodo,
  project: FolderPlus,
};

const statusStyles = {
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  merged: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  warning: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  reviewed: "border-pink-400/20 bg-pink-400/10 text-pink-300",
  fixed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  created: "border-pink-400/20 bg-pink-400/10 text-pink-300",
};

function getStatusLabel(status) {
  if (status === "success") return "Success";
  if (status === "merged") return "Merged";
  if (status === "warning") return "Warning";
  if (status === "reviewed") return "Reviewed";
  if (status === "fixed") return "Fixed";
  if (status === "created") return "Created";
  return status;
}

function formatTime(date) {
  if (!date) return "Recently";

  const createdAt = new Date(date);
  const diffMs = Date.now() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return createdAt.toLocaleDateString();
}

export default function ActivityTimeline({ activities }) {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute left-9 top-24 bottom-8 w-px bg-gradient-to-b from-pink-400/60 via-orange-400/35 to-transparent" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative mb-7">
        <p className="text-sm text-pink-300">Engineering Timeline</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Live Development Activity
        </h2>
        <p className="mt-2 text-sm text-[#a89bb8]">
          A chronological stream of user-specific commits, issues, pull
          requests, reviews, tasks, projects, and deployments.
        </p>
      </div>

      <div className="relative space-y-5">
        {activities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-8 text-center">
            <p className="text-lg font-semibold text-white">No activity yet</p>
            <p className="mt-2 text-sm text-[#a89bb8]">
              Create a project, create a task, or manually add an event to start
              the timeline.
            </p>
          </div>
        ) : (
          activities.map((item, index) => {
            const Icon = typeIcons[item.type] || FolderPlus;
            const projectName = item.project?.name || "Global";
            const statusClass =
              statusStyles[item.status] || statusStyles.created;

            return (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                className="relative pl-14"
              >
                <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-2xl border border-pink-400/20 bg-[#0b0614] text-pink-300 shadow-lg shadow-pink-500/10">
                  <Icon size={18} />
                </div>

                <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-pink-300/30 hover:bg-white/[0.075]">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#a89bb8]">
                        {item.description || "No description provided."}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                    >
                      <CheckCircle2 size={14} />
                      {getStatusLabel(item.status)}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[#a89bb8]">
                    <span className="rounded-full border border-white/10 bg-[#140c23]/75 px-3 py-1">
                      {projectName}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#140c23]/75 px-3 py-1">
                      {item.branch || "main"}
                    </span>

                    <span className="rounded-full border border-white/10 bg-[#140c23]/75 px-3 py-1">
                      {item.actor || "User"}
                    </span>

                    <span className="ml-auto text-[#a89bb8]/65">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })
        )}
      </div>
    </GlassCard>
  );
}