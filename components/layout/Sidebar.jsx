"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { commandNavItems } from "@/data/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-72 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:flex">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_24rem)]" />

      <Link href="/" className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30">
          <Sparkles size={24} />
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tight">DevOrbit</h1>
          <p className="text-xs text-slate-400">Mission Control</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {commandNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition",
                "hover:bg-white/7 hover:text-white",
                active &&
                  "bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20 shadow-lg shadow-cyan-500/10"
              )}
            >
              <Icon
                size={19}
                className={cn(
                  "transition group-hover:text-cyan-200",
                  active && "text-cyan-300"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-4">
        <div className="mb-3 flex items-center gap-2 text-emerald-300">
          <Gauge size={18} />
          <span className="text-sm font-semibold">System Health</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[82%] rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/40" />
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-400">
          82% workflow stability detected across active projects.
        </p>
      </div>
    </aside>
  );
}