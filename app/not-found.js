import Link from "next/link";
import GlowButton from "@/components/ui/GlowButton";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-white">
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-35" />

      <section className="max-w-2xl text-center">
        <p className="text-sm font-medium text-cyan-300">
          404 · Orbit Lost
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">
          This route drifted out of{" "}
          <span className="text-gradient">DevOrbit</span>
        </h1>

        <p className="mt-5 text-slate-400">
          The page you are looking for does not exist or has moved outside the
          command center.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <GlowButton href="/dashboard">Back to Dashboard</GlowButton>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-105 hover:border-cyan-300/50"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}