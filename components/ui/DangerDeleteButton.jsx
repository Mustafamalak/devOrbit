"use client";

import { motion } from "framer-motion";
import { Skull, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DangerDeleteButton({
    onClick,
    title = "Delete",
    size = "sm",
}) {
    const [armed, setArmed] = useState(false);

    const boxSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";
    const iconSize = size === "sm" ? 15 : 18;

    return (
        <motion.button
            type="button"
            title={title}
            onMouseEnter={() => setArmed(true)}
            onMouseLeave={() => setArmed(false)}
            onClick={onClick}
            whileHover={{
                scale: 1.12,
                rotate: [0, -8, 8, -5, 5, 0],
                transition: {
                    rotate: {
                        duration: 0.45,
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                },
            }}
            whileTap={{
                scale: 0.82,
                rotate: -18,
            }}
            className={`group relative grid ${boxSize} place-items-center overflow-hidden rounded-xl border border-rose-400/25 bg-rose-500/10 text-rose-300 shadow-lg shadow-rose-950/20 transition hover:border-rose-300/60 hover:bg-rose-500/20 hover:text-rose-100 hover:shadow-rose-500/25`}
        >
            <motion.span
                className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-400/30 to-orange-400/0"
                animate={
                    armed
                        ? {
                            x: ["-120%", "120%"],
                        }
                        : {
                            x: "-120%",
                        }
                }
                transition={{
                    duration: 0.8,
                    repeat: armed ? Infinity : 0,
                    ease: "linear",
                }}
            />

            <motion.span
                className="absolute h-12 w-12 rounded-full bg-rose-400/25 blur-xl"
                animate={
                    armed
                        ? {
                            scale: [0.4, 1.4, 0.7, 1.2],
                            opacity: [0.2, 0.75, 0.35, 0.65],
                        }
                        : {
                            scale: 0.4,
                            opacity: 0,
                        }
                }
                transition={{
                    duration: 0.9,
                    repeat: armed ? Infinity : 0,
                }}
            />

            <motion.span
                className="absolute inset-0 rounded-xl border border-rose-300/0"
                animate={
                    armed
                        ? {
                            boxShadow: [
                                "0 0 0px rgba(251,113,133,0)",
                                "0 0 22px rgba(251,113,133,0.8)",
                                "0 0 6px rgba(251,113,133,0.3)",
                            ],
                        }
                        : {}
                }
                transition={{
                    duration: 0.65,
                    repeat: armed ? Infinity : 0,
                }}
            />

            <motion.span
                className="relative z-10"
                animate={
                    armed
                        ? {
                            y: [0, -2, 2, -1, 1, 0],
                        }
                        : {
                            y: 0,
                        }
                }
                transition={{
                    duration: 0.28,
                    repeat: armed ? Infinity : 0,
                }}
            >
                {armed ? <Skull size={iconSize} /> : <Trash2 size={iconSize} />}
            </motion.span>

            <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rose-400 via-orange-300 to-rose-400"
                animate={
                    armed
                        ? {
                            width: ["0%", "100%", "0%"],
                            left: ["0%", "0%", "100%"],
                        }
                        : {
                            width: "0%",
                            left: "0%",
                        }
                }
                transition={{
                    duration: 0.9,
                    repeat: armed ? Infinity : 0,
                }}
            />
        </motion.button>
    );
}