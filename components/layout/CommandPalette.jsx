"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Search, X } from "lucide-react";
import { commandNavItems } from "@/data/navigation";

export default function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return commandNavItems;

    return commandNavItems.filter((item) => {
      return `${item.label} ${item.description}`.toLowerCase().includes(search);
    });
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function goToRoute(href) {
    router.push(href);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-start bg-black/60 px-4 pt-20 backdrop-blur-sm md:place-items-center md:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={19} className="text-cyan-300" />

              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                placeholder="Search command center..."
              />

              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto p-3">
              {results.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-semibold text-white">No command found</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Try searching dashboard, orbit, projects, tasks, activity, or insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => goToRoute(item.href)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-transparent px-4 py-3 text-left transition hover:border-cyan-300/20 hover:bg-cyan-400/10"
                      >
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white">
                            {item.label}
                          </p>
                          <p className="truncate text-sm text-slate-500">
                            {item.description}
                          </p>
                        </div>

                        <Command
                          size={15}
                          className="text-slate-600 transition group-hover:text-cyan-300"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-slate-500">
              <span>Navigate DevOrbit faster</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}