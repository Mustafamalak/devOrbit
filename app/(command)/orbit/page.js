import ProjectOrbitClient from "@/components/orbit/ProjectOrbitClient";

export default function OrbitPage() {
  return (
    <div className="pb-8">
      <section className="mb-6">
        <p className="text-sm font-medium text-pink-300">
          DevOrbit Universe
        </p>

        <h1 className="glow-text mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">
          3D Project <span className="text-gradient">Orbit Map</span>
        </h1>

        <p className="mt-3 max-w-3xl text-[#a89bb8]">
          Projects are visualized as living systems around your developer core.
          Health, bugs, task load, and sprint velocity influence how each project
          appears inside the command universe.
        </p>
      </section>

      <ProjectOrbitClient />
    </div>
  );
}