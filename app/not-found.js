import Link from "next/link";
import { Home, Orbit, Radar, Satellite } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-white">
      <div className="fixed inset-0 -z-20 bg-[#06030f]" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-30" />

      <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute bottom-[-12%] right-[-8%] h-[36rem] w-[36rem] rounded-full bg-orange-500/16 blur-3xl" />
      <div className="absolute left-[42%] top-[28%] h-[30rem] w-[30rem] rounded-full bg-violet-600/15 blur-3xl" />

      <section className="relative mx-auto max-w-4xl text-center">
        <div className="relative mx-auto mb-10 grid h-64 w-64 place-items-center">
          <div className="absolute h-64 w-64 rounded-full border border-pink-400/25" />
          <div className="absolute h-44 w-44 rounded-full border border-orange-400/20" />
          <div className="absolute h-28 w-28 rounded-full border border-violet-400/20" />

          <div className="absolute left-8 top-12">
            <Satellite className="text-pink-300" size={32} />
          </div>

          <div className="absolute bottom-12 right-8">
            <Radar className="text-orange-300" size={30} />
          </div>

          <div className="grid h-28 w-28 place-items-center rounded-full border border-pink-400/30 bg-pink-400/10 shadow-2xl shadow-pink-500/25 backdrop-blur-xl">
            <Orbit className="text-pink-200" size={42} />
          </div>
        </div>

        <p className="text-sm font-medium text-pink-300">
          404 · Orbit Signal Lost
        </p>

        <h1 className="glow-text mt-3 text-5xl font-black tracking-tight md:text-7xl">
          This route drifted out of{" "}
          <span className="text-gradient">DevOrbit</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[#a89bb8]">
          The page you are looking for does not exist, moved outside the command
          center, or belongs to another timeline in the project universe.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <GlowButton href="/dashboard">
            <Home size={17} />
            Back to Dashboard
          </GlowButton>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-105 hover:border-pink-300/50"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}