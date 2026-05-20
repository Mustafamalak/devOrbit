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
          Projects from your MongoDB workspace are visualized as living planets
          around your developer core. Project health, bugs, task load, and stack
          data shape the orbit intelligence panel.
        </p>
      </section>

      <ProjectOrbitClient />
    </div>
  );
}