import InsightMetricCard from "@/components/insights/InsightMetricCard";
import CommitChart from "@/components/insights/CommitChart";
import TaskCompletionChart from "@/components/insights/TaskCompletionChart";
import BugTrendChart from "@/components/insights/BugTrendChart";
import FocusHoursChart from "@/components/insights/FocusHoursChart";
import InsightBrief from "@/components/insights/InsightBrief";
import { insightCards } from "@/data/mockData";

export default function InsightsPage() {
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
              Convert engineering activity into visual intelligence. Track
              commit velocity, task closure, quality pressure, focus hours, and
              sprint readiness from a single analytics cockpit.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            Productivity score: 87%
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card, index) => (
          <InsightMetricCard key={card.label} card={card} index={index} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <CommitChart />
        <TaskCompletionChart />
        <BugTrendChart />
        <FocusHoursChart />
      </section>

      <section className="mt-6">
        <InsightBrief />
      </section>
    </div>
  );
}