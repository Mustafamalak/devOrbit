"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Stars,
  Text,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { orbitProjects } from "@/data/mockData";

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      Math.PI * 2,
      false,
      0
    );

    return curve.getPoints(160).map((point) => new THREE.Vector3(point.x, 0, point.y));
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color="#334155"
        transparent
        opacity={0.34}
        linewidth={1}
      />
    </line>
  );
}

function DeveloperCore() {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group>
      <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.55}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.05, 4]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.65}
            roughness={0.22}
            metalness={0.35}
          />
        </mesh>

        <mesh scale={1.25}>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} wireframe />
        </mesh>

        <Text
          position={[0, -1.65, 0]}
          fontSize={0.22}
          color="#e0f2fe"
          anchorX="center"
          anchorY="middle"
        >
          Developer Core
        </Text>
      </Float>

      <pointLight position={[0, 0, 0]} intensity={4.5} color="#22d3ee" />
    </group>
  );
}

function ProjectPlanet({ project, index, selectedProject, setSelectedProject }) {
  const groupRef = useRef();
  const planetRef = useRef();

  const startAngle = useMemo(() => index * 1.35, [index]);
  const isSelected = selectedProject?.id === project.id;

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * project.speed + startAngle;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * project.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * project.orbitRadius;
      groupRef.current.position.y = Math.sin(elapsed * 0.8 + index) * 0.16;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.85;
      planetRef.current.rotation.x += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={planetRef}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedProject(project);
        }}
        scale={isSelected ? 1.25 : 1}
      >
        <sphereGeometry args={[project.size, 48, 48]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.75 : 0.35}
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>

      <mesh scale={isSelected ? 1.55 : 1.28}>
        <sphereGeometry args={[project.size, 32, 32]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={isSelected ? 0.18 : 0.08}
        />
      </mesh>

      <Html
        position={[0, project.size + 0.42, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: "none" }}
      >
        <div className="rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">
          {project.name}
        </div>
      </Html>

      {project.bugs > 3 && (
        <Sparkles
          count={12}
          scale={[1.4, 1.4, 1.4]}
          size={2}
          speed={0.35}
          color="#ef4444"
        />
      )}
    </group>
  );
}

function OrbitUniverse({ selectedProject, setSelectedProject }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      <pointLight position={[-4, 3, -5]} intensity={1.2} color="#8b5cf6" />

      <Stars radius={90} depth={45} count={2200} factor={4} saturation={0} fade speed={1} />

      <DeveloperCore />

      {orbitProjects.map((project) => (
        <OrbitRing key={`ring-${project.id}`} radius={project.orbitRadius} />
      ))}

      {orbitProjects.map((project, index) => (
        <ProjectPlanet
          key={project.id}
          project={project}
          index={index}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      ))}

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={6}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.35}
      />
    </>
  );
}

export default function ProjectOrbitScene() {
  const [selectedProject, setSelectedProject] = useState(orbitProjects[0]);

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-6 xl:grid-cols-[1fr_380px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/30">
        <div className="absolute left-5 top-5 z-10 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-200 backdrop-blur-xl">
          Interactive 3D Project Universe
        </div>

        <div className="absolute bottom-5 left-5 z-10 max-w-md rounded-3xl border border-white/10 bg-slate-950/65 p-4 text-sm text-slate-300 backdrop-blur-xl">
          Drag to rotate. Scroll to zoom. Click any project planet to inspect its
          workflow health, sprint status, task load, and stack.
        </div>

        <Canvas camera={{ position: [0, 5.3, 8.6], fov: 48 }}>
          <OrbitUniverse
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </Canvas>
      </div>

      <aside className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <div className="mb-5">
          <p className="text-sm text-cyan-300">Selected Project</p>
          <h2 className="mt-2 text-3xl font-black text-white">
            {selectedProject.name}
          </h2>
          <p className="mt-1 text-sm text-slate-400">{selectedProject.type}</p>
        </div>

        <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">Health Score</span>
            <span className="font-bold text-cyan-300">
              {selectedProject.health}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
              style={{ width: `${selectedProject.health}%` }}
            />
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-slate-300">
          {selectedProject.description}
        </p>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Tasks</p>
            <p className="mt-1 text-2xl font-black text-white">
              {selectedProject.tasks}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Bugs</p>
            <p className="mt-1 text-2xl font-black text-red-300">
              {selectedProject.bugs}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Commits</p>
            <p className="mt-1 text-2xl font-black text-emerald-300">
              {selectedProject.commits}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-3 text-sm font-medium text-slate-300">Stack</p>
          <div className="flex flex-wrap gap-2">
            {selectedProject.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-400/20 bg-purple-400/10 p-4">
          <p className="text-sm font-semibold text-purple-200">
            Orbit Intelligence
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {selectedProject.status === "Healthy"
              ? "This project is stable and ready for feature expansion."
              : selectedProject.status === "Warning"
              ? "This project needs focused sprint cleanup before new feature work."
              : "This project requires review. Resolve bug clusters and reduce open tasks first."}
          </p>
        </div>
      </aside>
    </div>
  );
}