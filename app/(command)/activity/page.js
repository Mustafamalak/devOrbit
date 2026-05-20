"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import ActivityStats from "@/components/activity/ActivityStats";
import ActivityTimeline from "@/components/activity/ActivityTimeline";
import DeploymentPanel from "@/components/activity/DeploymentPanel";
import CreateActivityForm from "@/components/activity/CreateActivityForm";
import { activityApi } from "@/lib/api";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadActivities() {
    try {
      setLoading(true);
      setError("");
      const data = await activityApi.getActivities();
      setActivities(data.activities || []);
    } catch (err) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  function handleCreated(activity) {
    setActivities((current) => [activity, ...current]);
  }

  return (
    <div className="pb-10">
      <CreateActivityForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />

      <section className="mb-7">
        <p className="text-sm font-medium text-pink-300">Activity Stream</p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Engineering <span className="text-gradient">Timeline</span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              Monitor the complete flow of user-specific development events
              from MongoDB including projects, tasks, reviews, bugs, and
              deployments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
          >
            <Plus size={17} />
            Add Activity
          </button>
        </div>
      </section>

      {loading ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />
          <p className="text-lg font-semibold text-white">Loading activity</p>
          <p className="mt-2 text-[#a89bb8]">
            Fetching your engineering timeline from MongoDB.
          </p>
        </div>
      ) : error ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">
            Could not load activity
          </p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>

          <button
            type="button"
            onClick={loadActivities}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <ActivityStats activities={activities} />

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <ActivityTimeline activities={activities} />
            <DeploymentPanel />
          </section>
        </>
      )}
    </div>
  );
}