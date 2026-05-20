import ActivityStats from "@/components/activity/ActivityStats";
import ActivityTimeline from "@/components/activity/ActivityTimeline";
import DeploymentPanel from "@/components/activity/DeploymentPanel";

export default function ActivityPage() {
  return (
    <div className="pb-10">
      <section className="mb-7">
        <p className="text-sm font-medium text-pink-300">Activity Stream</p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Engineering <span className="text-gradient">Timeline</span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              Monitor the complete flow of development events including commits,
              pull requests, bug fixes, system alerts, reviews, and deployments.
            </p>
          </div>

          <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 px-4 py-3 text-sm text-pink-200">
            Live engineering mode
          </div>
        </div>
      </section>

      <ActivityStats />

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <ActivityTimeline />
        <DeploymentPanel />
      </section>
    </div>
  );
}