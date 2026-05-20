"use client";

import {
  Bug,
  FolderPlus,
  GitCommit,
  GitPullRequest,
  ListTodo,
  Rocket,
  ShieldCheck,
  TriangleAlert,
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

export default function ActivityFeed({ activities }) {
  const visibleActivities = activities.slice(0, 6);

  return (
    <GlassCard className="h-full">
      <div className="mb-5">
        <p className="text-sm text-orange-300">Recent Activity</p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Engineering Feed
        </h2>
      </div>

      <div className="space-y-4">
        {visibleActivities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-6 text-center">
            <p className="font-semibold text-white">No activity yet</p>
            <p className="mt-2 text-sm text-[#a89bb8]">
              Project and task actions will appear here.
            </p>
          </div>
        ) : (
          visibleActivities.map((item) => {
            const Icon = typeIcons[item.type] || FolderPlus;

            return (
              <div
                key={item._id}
                className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-pink-300/25"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-[#a89bb8]">
                    {item.description || "No description"}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#a89bb8]/70">
                    <span>{item.project?.name || "Global"}</span>
                    <span>{formatTime(item.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </GlassCard>
  );
}