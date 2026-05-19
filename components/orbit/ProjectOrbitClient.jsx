"use client";

import dynamic from "next/dynamic";

const ProjectOrbitScene = dynamic(
  () => import("@/components/orbit/ProjectOrbitScene"),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-slate-950/80 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300" />
          <p className="text-sm font-medium text-cyan-300">
            Loading 3D Orbit Map
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Preparing project universe...
          </h2>
        </div>
      </div>
    ),
  }
);

export default function ProjectOrbitClient() {
  return <ProjectOrbitScene />;
}