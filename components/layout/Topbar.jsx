"use client";

import Link from "next/link";
import { Bell, Command, Menu, Search, Sparkles } from "lucide-react";

export default function Topbar({ onMenuClick, onCommandClick }) {
  return (
    <header className="sticky top-0 z-30 mb-6 border-b border-white/10 bg-slate-950/55 px-4 py-4 backdrop-blur-2xl lg:rounded-b-3xl lg:border lg:border-white/10">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
            <Sparkles size={20} />
          </div>
          <span className="font-black">DevOrbit</span>
        </Link>

        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          onClick={onCommandClick}
          className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-400 transition hover:border-cyan-300/30 hover:bg-white/[0.07] lg:flex"
        >
          <Search size={18} />
          <span className="w-full text-sm text-slate-500">
            Search projects, tasks, commits...
          </span>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-slate-900 px-2 py-1 text-xs">
            <Command size={13} /> K
          </div>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onCommandClick}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-200 lg:hidden"
          >
            <Search size={18} />
          </button>

          <button className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-200">
            <Bell size={18} />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-purple-500 text-sm font-black text-white">
              M
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Mustafa</p>
              <p className="text-xs text-slate-400">Frontend Commander</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}