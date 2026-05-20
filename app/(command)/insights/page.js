"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import InsightMetricCard from "@/components/insights/InsightMetricCard";
import CommitChart from "@/components/insights/CommitChart";
import TaskCompletionChart from "@/components/insights/TaskCompletionChart";
import BugTrendChart from "@/components/insights/BugTrendChart";
import FocusHoursChart from "@/components/insights/FocusHoursChart";
import InsightBrief from "@/components/insights/InsightBrief";
import { activityApi, projectApi, taskApi } from "@/lib/api";

function buildInsightCards(projects, tasks, activities) {
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const totalBugs = projects.reduce(
    (sum, project) => sum + Number(project.bugsCount || 0),
    0
  );

  const avgHealth =
    projects.length === 0
      ? 0
      : Math.round(
        projects.reduce((sum, project) => sum + Number(project.health || 0), 0) /
        projects.length
      );

  const closureRate =
    tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  const productivityScore = Math.round((avgHealth + closureRate) / 2);

  return [
    {
      label: "Productivity Score",
      value: productivityScore,
      suffix: "%",
      detail: "based on health + closure",
      icon: "productivity",
      tone: "pink",
    },
    {
      label: "Activity Events",
      value: activities.length,
      suffix: "",
      detail: "tracked timeline events",
      icon: "activity",
      tone: "orange",
    },
    {
      label: "Task Closure",
      value: closureRate,
      suffix: "%",
      detail: `${doneTasks}/${tasks.length} tasks done`,
      icon: "closure",
      tone: "emerald",
    },
    {
      label: "Bug Pressure",
      value: totalBugs,
      suffix: "",
      detail: "open project bugs",
      icon: "bugs",
      tone: totalBugs > 0 ? "rose" : "violet",
    },
  ];
}

function buildCommitChart(projects) {
  if (projects.length === 0) {
    return [{ name: "No Data", commits: 0, tasks: 0 }];
  }

  return projects.slice(0, 7).map((project) => ({
    name: project.name.length > 8 ? `${project.name.slice(0, 8)}...` : project.name,
    commits: Number(project.commitsCount || 0),
    tasks: Number(project.tasksCount || 0),
  }));
}

function buildTaskDistribution(tasks) {
  return [
    {
      name: "Backlog",
      value: tasks.filter((task) => task.status === "backlog").length,
    },
    {
      name: "Progress",
      value: tasks.filter((task) => task.status === "progress").length,
    },
    {
      name: "Review",
      value: tasks.filter((task) => task.status === "review").length,
    },
    {
      name: "Done",
      value: tasks.filter((task) => task.status === "done").length,
    },
  ];
}

function buildBugTrend(projects) {
  if (projects.length === 0) {
    return [{ name: "No Data", bugs: 0, health: 0 }];
  }

  return projects.slice(0, 7).map((project) => ({
    name: project.name.length > 8 ? `${project.name.slice(0, 8)}...` : project.name,
    bugs: Number(project.bugsCount || 0),
    health: Number(project.health || 0),
  }));
}

function buildActivityPulse(activities) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const counts = days.map((day) => ({
    day,
    events: 0,
  }));

  activities.forEach((activity) => {
    const date = new Date(activity.createdAt);
    const dayIndex = date.getDay();
    counts[dayIndex].events += 1;
  });

  return counts;
}

export default function InsightsPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadInsights() {
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
      setError(err.message || "Failed to load insights");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInsights();
  }, []);

  const insightCards = useMemo(
    () => buildInsightCards(projects, tasks, activities),
    [projects, tasks, activities]
  );

  const commitChartData = useMemo(
    () => buildCommitChart(projects),
    [projects]
  );

  const taskDistributionData = useMemo(
    () => buildTaskDistribution(tasks),
    [tasks]
  );

  const bugTrendData = useMemo(
    () => buildBugTrend(projects),
    [projects]
  );

  const activityPulseData = useMemo(
    () => buildActivityPulse(activities),
    [activities]
  );

  return (
    <div className="pb-10">
      <section className="mb-7">
        <p className="text-sm font-medium text-pink-300">
          Productivity Intelligence
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Developer <span className="text-gradient">Insights</span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              These analytics are calculated from your MongoDB-backed projects,
              tasks, and activity timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            MongoDB analytics active
          </div>
        </div>
      </section>

      {loading ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />
          <p className="text-lg font-semibold text-white">Loading insights</p>
          <p className="mt-2 text-[#a89bb8]">
            Calculating analytics from your workspace.
          </p>
        </div>
      ) : error ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">
            Could not load insights
          </p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>

          <button
            type="button"
            onClick={loadInsights}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {insightCards.map((card, index) => (
              <InsightMetricCard key={card.label} card={card} index={index} />
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-2">
            <CommitChart data={commitChartData} />
            <TaskCompletionChart data={taskDistributionData} />
            <BugTrendChart data={bugTrendData} />
            <FocusHoursChart data={activityPulseData} />
          </section>

          <section className="mt-6">
            <InsightBrief
              projects={projects}
              tasks={tasks}
              activities={activities}
            />
          </section>
        </>
      )}
    </div>
  );
}