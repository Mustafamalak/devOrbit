import ProjectsPageClient from "@/components/projects/ProjectsPageClient";

export default function ProjectsPage() {
  return (
    <div className="pb-10">
      <section className="mb-7">
        <p className="text-sm font-medium text-pink-300">Project Systems</p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Project <span className="text-gradient">Fleet</span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              Manage MongoDB-backed project systems and import GitHub
              repositories into your DevOrbit workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            GitHub import ready
          </div>
        </div>
      </section>

      <ProjectsPageClient />
    </div>
  );
}