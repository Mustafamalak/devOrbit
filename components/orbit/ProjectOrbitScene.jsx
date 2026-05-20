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

    return curve
      .getPoints(180)
      .map((point) => new THREE.Vector3(point.x, 0, point.y));
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#a855f7" transparent opacity={0.28} />
    </line>
  );
}

function DeveloperCore() {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.38;
      coreRef.current.rotation.x += delta * 0.14;
    }
  });

  return (
    <group>
      <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.55}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.05, 4]} />
          <meshStandardMaterial
            color="#ff4ecd"
            emissive="#ff4ecd"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.42}
          />
        </mesh>

        <mesh scale={1.28}>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshBasicMaterial
            color="#ff8a3d"
            transparent
            opacity={0.09}
            wireframe
          />
        </mesh>

        <Text
          position={[0, -1.65, 0]}
          fontSize={0.22}
          color="#faf7ff"
          anchorX="center"
          anchorY="middle"
        >
          Developer Core
        </Text>
      </Float>

      <pointLight position={[0, 0, 0]} intensity={5.2} color="#ff4ecd" />
      <pointLight position={[2, 2, 2]} intensity={1.6} color="#ff8a3d" />
    </group>
  );
}

function ProjectPlanet({ project, index, selectedProject, setSelectedProject }) {
  const groupRef = useRef();
  const planetRef = useRef();

  const startAngle = useMemo(() => index * 1.35, [index]);
  const isSelected = selectedProject?._id === project._id;

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * project.orbitSpeed + startAngle;

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
        scale={isSelected ? 1.28 : 1}
      >
        <sphereGeometry args={[project.orbitSize, 48, 48]} />
        <meshStandardMaterial
          color={project.orbitColor}
          emissive={project.orbitColor}
          emissiveIntensity={isSelected ? 0.85 : 0.42}
          roughness={0.25}
          metalness={0.28}
        />
      </mesh>

      <mesh scale={isSelected ? 1.65 : 1.3}>
        <sphereGeometry args={[project.orbitSize, 32, 32]} />
        <meshBasicMaterial
          color={project.orbitColor}
          transparent
          opacity={isSelected ? 0.2 : 0.08}
        />
      </mesh>

      <Html
        position={[0, project.orbitSize + 0.42, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: "none" }}
      >
        <div className="rounded-full border border-white/15 bg-[#0b0614]/80 px-3 py-1 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">
          {project.name}
        </div>
      </Html>

      {Number(project.bugsCount || 0) > 3 && (
        <Sparkles
          count={12}
          scale={[1.4, 1.4, 1.4]}
          size={2}
          speed={0.35}
          color="#fb7185"
        />
      )}
    </group>
  );
}

function OrbitUniverse({ projects, selectedProject, setSelectedProject }) {
  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[5, 5, 5]} intensity={1.7} />
      <pointLight position={[-4, 3, -5]} intensity={1.4} color="#7c3aed" />
      <pointLight position={[4, -2, 3]} intensity={1.1} color="#ff8a3d" />

      <Stars
        radius={95}
        depth={48}
        count={2600}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Sparkles
        count={70}
        scale={[13, 7, 13]}
        size={2}
        speed={0.28}
        color="#ff4ecd"
        opacity={0.5}
      />

      <DeveloperCore />

      {projects.map((project) => (
        <OrbitRing key={`ring-${project._id}`} radius={project.orbitRadius} />
      ))}

      {projects.map((project, index) => (
        <ProjectPlanet
          key={project._id}
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

function getStatusStyle(status) {
  if (status === "Healthy") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Warning") {
    return "border-orange-400/20 bg-orange-400/10 text-orange-300";
  }

  if (status === "Prototype") {
    return "border-violet-400/20 bg-violet-400/10 text-violet-300";
  }

  return "border-rose-400/20 bg-rose-400/10 text-rose-300";
}

export default function ProjectOrbitScene({ projects }) {
  const [selectedProject, setSelectedProject] = useState(projects[0] || null);

  if (!projects || projects.length === 0) {
    return (
      <div className="premium-card grid min-h-[28rem] place-items-center rounded-[2rem] p-10 text-center">
        <div>
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
            3D
          </div>

          <h2 className="text-3xl font-black text-white">
            No project planets yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[#a89bb8]">
            Create projects from the Projects page. Each project will become a
            live planet in your personal DevOrbit universe.
          </p>
        </div>
      </div>
    );
  }

  const activeProject = selectedProject || projects[0];

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-6 xl:grid-cols-[1fr_380px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0614]/82 shadow-2xl shadow-pink-950/30">
        <div className="absolute left-5 top-5 z-10 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-xs font-medium text-pink-200 backdrop-blur-xl">
          MongoDB Project Universe
        </div>

        <div className="absolute bottom-5 left-5 z-10 max-w-md rounded-3xl border border-white/10 bg-[#0b0614]/70 p-4 text-sm text-[#cfc3dd] backdrop-blur-xl">
          Drag to rotate. Scroll to zoom. Click any project planet to inspect its
          health, sprint status, task load, bugs, commits, and stack.
        </div>

        <Canvas camera={{ position: [0, 5.3, 8.6], fov: 48 }}>
          <OrbitUniverse
            projects={projects}
            selectedProject={activeProject}
            setSelectedProject={setSelectedProject}
          />
        </Canvas>
      </div>

      <aside className="premium-card rounded-[2rem] p-5">
        <div className="mb-5">
          <p className="text-sm text-pink-300">Selected Project</p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {activeProject.name}
          </h2>

          <p className="mt-1 text-sm text-[#a89bb8]">
            {activeProject.category}
          </p>
        </div>

        <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.045] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#a89bb8]">Health Score</span>
            <span className="font-bold text-pink-300">
              {activeProject.health}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600"
              style={{ width: `${activeProject.health}%` }}
            />
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-[#cfc3dd]">
          {activeProject.description || "No description provided."}
        </p>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs text-[#a89bb8]/70">Tasks</p>
            <p className="mt-1 text-2xl font-black text-white">
              {activeProject.tasksCount || 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs text-[#a89bb8]/70">Bugs</p>
            <p className="mt-1 text-2xl font-black text-rose-300">
              {activeProject.bugsCount || 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs text-[#a89bb8]/70">Commits</p>
            <p className="mt-1 text-2xl font-black text-emerald-300">
              {activeProject.commitsCount || 0}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-3 text-sm font-medium text-[#cfc3dd]">Stack</p>

          <div className="flex flex-wrap gap-2">
            {(activeProject.stack || []).length === 0 ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#a89bb8]">
                No stack added
              </span>
            ) : (
              activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-200"
                >
                  {tech}
                </span>
              ))
            )}
          </div>
        </div>

        <div className={`rounded-3xl border p-4 ${getStatusStyle(activeProject.status)}`}>
          <p className="text-sm font-semibold">Orbit Intelligence</p>

          <p className="mt-2 text-sm leading-6 text-[#cfc3dd]">
            {activeProject.status === "Healthy"
              ? "This project is stable and ready for feature expansion."
              : activeProject.status === "Warning"
                ? "This project needs focused sprint cleanup before new feature work."
                : activeProject.status === "Prototype"
                  ? "This project is in early orbit. Validate workflow before scaling."
                  : "This project requires review. Resolve bug clusters and reduce open tasks first."}
          </p>
        </div>
      </aside>
    </div>
  );
}