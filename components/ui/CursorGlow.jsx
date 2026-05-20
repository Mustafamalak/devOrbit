"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const smoothX = useSpring(mouseX, {
        stiffness: 70,
        damping: 22,
        mass: 0.6,
    });

    const smoothY = useSpring(mouseY, {
        stiffness: 70,
        damping: 22,
        mass: 0.6,
    });

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        setEnabled(isFinePointer);

        if (!isFinePointer) return;

        function handleMouseMove(event) {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[1] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/14 blur-3xl"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            />

            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[1] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            />

            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[1] h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/12 blur-2xl"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            />
        </>
    );
}