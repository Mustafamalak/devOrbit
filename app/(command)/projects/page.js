import ProjectsGrid from "@/components/projects/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <div className="pb-10">
      <section className="mb-7">
        <p className="text-sm font-medium text-cyan-300">
          Project Systems
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Active Project <span className="text-gradient">Fleet</span>
            </h1>

            <p className="mt-3 max-w-3xl text-slate-400">
              Track every project like a living system. Monitor health,
              priority, build progress, bug pressure, stack composition, and
              delivery readiness from one premium command interface.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            6 systems connected
          </div>
        </div>
      </section>

      <ProjectsGrid />
    </div>
  );
}