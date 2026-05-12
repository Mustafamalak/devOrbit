import dynamic from "next/dynamic";

const ProjectOrbitScene = dynamic(
  () => import("@/components/orbit/ProjectOrbitScene"),
  {
    ssr: false,
  }
);

export default function OrbitPage() {
  return (
    <div className="pb-8">
      <section className="mb-6">
        <p className="text-sm font-medium text-cyan-300">
          DevOrbit Universe
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">
          3D Project <span className="text-gradient">Orbit Map</span>
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          Projects are visualized as living systems around your developer core.
          Health, bugs, task load, and sprint velocity influence how each project
          appears inside the command universe.
        </p>
      </section>

      <ProjectOrbitScene />
    </div>
  );
}