import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#a89bb8] md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 DevOrbit. A frontend-first developer productivity command
          center.
        </p>

        <div className="flex flex-wrap gap-5">
          <Link href="/dashboard" className="transition hover:text-pink-200">
            Dashboard
          </Link>
          <Link href="/orbit" className="transition hover:text-pink-200">
            Orbit Map
          </Link>
          <Link href="/projects" className="transition hover:text-pink-200">
            Projects
          </Link>
          <Link href="/insights" className="transition hover:text-pink-200">
            Insights
          </Link>
        </div>
      </div>
    </footer>
  );
}