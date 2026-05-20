"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Command,
  LogOut,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Topbar({ onMenuClick, onCommandClick }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 mb-6 border-b border-white/10 bg-[#0b0614]/60 px-4 py-4 backdrop-blur-2xl lg:rounded-b-3xl lg:border lg:border-white/10">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 via-orange-400 to-violet-600 text-white">
            <Sparkles size={20} />
          </div>
          <span className="font-black text-white">DevOrbit</span>
        </Link>

        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#a89bb8] transition hover:border-pink-300/30 hover:text-pink-200 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          onClick={onCommandClick}
          className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-[#a89bb8] transition hover:border-pink-300/30 hover:bg-white/[0.07] lg:flex"
        >
          <Search size={18} />
          <span className="w-full text-sm text-[#a89bb8]/70">
            Search projects, tasks, commits...
          </span>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#140c23] px-2 py-1 text-xs text-pink-200">
            <Command size={13} /> K
          </div>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onCommandClick}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#a89bb8] transition hover:border-pink-300/30 hover:text-pink-200 lg:hidden"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#a89bb8] transition hover:border-pink-300/30 hover:text-pink-200"
          >
            <Bell size={18} />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-pink-400 shadow-lg shadow-pink-500/50" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-pink-400 via-orange-400 to-violet-600 text-sm font-black text-white">
              {initials}
            </div>

            <div>
              <p className="max-w-32 truncate text-sm font-semibold text-white">
                {user?.name || "Developer"}
              </p>
              <p className="max-w-40 truncate text-xs text-[#a89bb8]">
                {user?.email || "command user"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300 transition hover:scale-105 hover:bg-rose-400/15"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}