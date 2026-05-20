"use client";

import { motion } from "framer-motion";

const stack = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "@react-three/fiber",
  "@react-three/drei",
  "Recharts",
  "Lucide React",
  "JavaScript",
];

export default function TechStackSection() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-medium text-emerald-300">Tech Stack</p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
          Built with a modern{" "}
          <span className="text-gradient">frontend engineering stack</span>
        </h2>

        <p className="mt-5 text-[#a89bb8]">
          The project focuses on production-grade frontend skills: routing,
          reusable components, animations, charts, 3D scenes, responsive layouts,
          visual hierarchy, and deployment readiness.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {stack.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
            whileHover={{ y: -7, scale: 1.035 }}
            className="premium-card ember-border rounded-3xl p-5 text-center font-semibold text-white transition hover:text-pink-200"
          >
            <span className="text-gradient">{tech}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}