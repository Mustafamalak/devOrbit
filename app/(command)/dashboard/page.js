"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import ProjectHealth from "@/components/dashboard/ProjectHealth";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AiSummaryCard from "@/components/dashboard/AiSummaryCard";
import DashboardSpaceBackground from "@/components/dashboard/DashboardSpaceBackground";
import { useAuth } from "@/components/auth/AuthProvider";
import { activityApi, projectApi, taskApi } from "@/lib/api";
import GitHubCommitSyncCard from "@/components/github/GitHubCommitSyncCard";

function buildMetrics(projects, tasks, activities) {
  const totalBugs = projects.reduce(
    (sum, project) => sum + Number(project.bugsCount || 0),
    0
  );

  const totalCommits = projects.reduce(
    (sum, project) => sum + Number(project.commitsCount || 0),
    0
  );

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const avgHealth =
    projects.length === 0
      ? 0
      : Math.round(
        projects.reduce((sum, project) => sum + Number(project.health || 0), 0) /
        projects.length
      );

  return [
    {
      label: "Projects",
      value: projects.length,
      detail: "MongoDB systems",
      icon: "projects",
      tone: "pink",
    },
    {
      label: "Tasks",
      value: tasks.length,
      detail: `${completedTasks} completed`,
      icon: "tasks",
      tone: "orange",
    },
    {
      label: "Commits",
      value: totalCommits,
      detail: "tracked manually",
      icon: "commits",
      tone: "violet",
    },
    {
      label: "Avg Health",
      value: avgHealth,
      suffix: "%",
      detail: `${totalBugs} open bugs`,
      icon: totalBugs > 0 ? "bugs" : "completed",
      tone: totalBugs > 0 ? "rose" : "emerald",
    },
  ];
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [projectData, taskData, activityData] = await Promise.all([
        projectApi.getProjects(),
        taskApi.getTasks(),
        activityApi.getActivities(),
      ]);

      setProjects(projectData.projects || []);
      setTasks(taskData.tasks || []);
      setActivities(activityData.activities || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const dashboardMetrics = useMemo(() => {
    return buildMetrics(projects, tasks, activities);
  }, [projects, tasks, activities]);

  return (
    <div className="relative pb-10">
      <DashboardSpaceBackground />

      <section className="relative z-10 mb-7">
        <p className="text-sm font-medium text-pink-300">
          Developer Command Center
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Welcome back,{" "}
              <span className="text-gradient">
                {user?.name?.split(" ")[0] || "Developer"}
              </span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              This dashboard is now connected to your MongoDB-backed projects,
              tasks, and activity timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 px-4 py-3 text-sm text-pink-200">
            Full-stack mode active
          </div>
        </div>
      </section>

      {loading ? (
        <div className="premium-card relative z-10 rounded-[2rem] p-10 text-center">
          <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />
          <p className="text-lg font-semibold text-white">Loading dashboard</p>
          <p className="mt-2 text-[#a89bb8]">
            Fetching projects, tasks, and activity from MongoDB.
          </p>
        </div>
      ) : error ? (
        <div className="premium-card relative z-10 rounded-[2rem] p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">
            Could not load dashboard
          </p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="relative z-10">
          <section className="mb-6">
            <GitHubCommitSyncCard
              onSynced={() => {
                loadDashboard();
              }}
            />
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <ProductivityChart tasks={tasks} activities={activities} />
            <ProjectHealth projects={projects} />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <ActivityFeed activities={activities} />
            <AiSummaryCard
              projects={projects}
              tasks={tasks}
              activities={activities}
            />
          </section>
        </div>
      )}
    </div>
  );
}