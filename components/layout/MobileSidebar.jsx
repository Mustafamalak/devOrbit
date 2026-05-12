"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Gauge, Sparkles, X } from "lucide-react";
import { commandNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function MobileSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          <motion.aside
            initial={{ x: -320, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed left-3 top-3 z-[60] flex h-[calc(100vh-1.5rem)] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/92 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_22rem)]" />

            <div className="mb-8 flex items-center justify-between gap-3 px-2">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h1 className="text-lg font-black tracking-tight text-white">
                    DevOrbit
                  </h1>
                  <p className="text-xs text-slate-400">Mission Control</p>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              {commandNavItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition",
                      "hover:bg-white/7 hover:text-white",
                      active &&
                        "bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20"
                    )}
                  >
                    <Icon
                      size={19}
                      className={cn(active && "text-cyan-300")}
                    />
                    <div>
                      <p>{item.label}</p>
                      <p className="text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Gauge size={18} />
                <span className="text-sm font-semibold">Mobile Sync</span>
              </div>

              <p className="text-xs leading-5 text-slate-400">
                Command navigation optimized for smaller screens.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}