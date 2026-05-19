"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";

function MovingNebula() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.025;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={85}
        depth={45}
        count={2600}
        factor={4}
        saturation={0}
        fade
        speed={0.8}
      />

      <Sparkles
        count={85}
        scale={[16, 8, 16]}
        size={2.2}
        speed={0.35}
        color="#ff4ecd"
        opacity={0.65}
      />

      <Sparkles
        count={55}
        scale={[18, 10, 18]}
        size={1.8}
        speed={0.24}
        color="#ff8a3d"
        opacity={0.45}
      />

      <Sparkles
        count={45}
        scale={[15, 9, 15]}
        size={2}
        speed={0.2}
        color="#7c3aed"
        opacity={0.48}
      />
    </group>
  );
}

export default function DashboardSpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-55">    
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <MovingNebula />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,3,15,0.35)_42%,rgba(6,3,15,0.94)_100%)]" />
    </div>
  );
}