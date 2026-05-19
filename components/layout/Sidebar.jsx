"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { commandNavItems } from "@/data/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-72 flex-col overflow-hidden rounded-4xl border border-white/10 bg-[#0b0614]/75 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:flex">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,78,205,0.18),transparent_24rem)]" />
      <div className="absolute bottom-0 right-0 -z-10 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

      <Link href="/" className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-pink-400 via-orange-400 to-violet-600 text-white shadow-lg shadow-pink-500/30">
          <Sparkles size={24} />
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tight text-white">
            DevOrbit
          </h1>
          <p className="text-xs text-[#a89bb8]">Mission Control</p>
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
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#a89bb8] transition",
                "hover:bg-white/7 hover:text-white",
                active &&
                  "bg-pink-400/10 text-pink-200 ring-1 ring-pink-300/20 shadow-lg shadow-pink-500/10"
              )}
            >
              <Icon
                size={19}
                className={cn(
                  "transition group-hover:text-pink-200",
                  active && "text-pink-300"
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

        <div className="h-2 overflow-hidden rounded-full bg-[#140c23]">
          <div className="h-full w-[82%] rounded-full bg-linear-to-r from-emerald-400 to-pink-400 shadow-lg shadow-emerald-500/30" />
        </div>

        <p className="mt-3 text-xs leading-5 text-[#a89bb8]">
          82% workflow stability detected across active projects.
        </p>
      </div>
    </aside>
  );
}