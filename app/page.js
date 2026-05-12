export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          DevOrbit Alpha Interface
        </p>

        <h1 className="max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
          Turn Your Developer Workflow Into a{" "}
          <span className="text-gradient">Living Universe</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Visualize projects, tasks, commits, deadlines, bugs, and developer
          productivity inside a futuristic command center.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/dashboard"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-105"
          >
            Enter Command Center
          </a>

          <a
            href="/orbit"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:scale-105 hover:border-cyan-300/50"
          >
            View Orbit Map
          </a>
        </div>
      </section>
    </main>
  );
}