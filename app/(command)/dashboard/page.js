import DashboardSpaceBackground from "@/components/dashboard/DashboardSpaceBackground";import MetricCard from "@/components/dashboard/MetricCard";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import ProjectHealth from "@/components/dashboard/ProjectHealth";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AiSummaryCard from "@/components/dashboard/AiSummaryCard";
import { metrics } from "@/data/mockData";

export default function DashboardPage() {
  return (
    <div className="pb-10">
      <DashboardSpaceBackground />

      <section className="mb-8">
        <p className="text-sm font-medium text-cyan-300">
          DevOrbit Command Center
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Welcome back,{" "}
              <span className="text-gradient">Mustafa</span>
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Your project universe is active. Monitor engineering velocity,
              project health, sprint signals, and live development activity from
              one futuristic dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 px-4 py-3 text-sm text-pink-200">
  System Sync: Live Mock Mode
</div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <ProductivityChart />
        <ProjectHealth />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ActivityFeed />
        <AiSummaryCard />
      </section>
    </div>
  );
}