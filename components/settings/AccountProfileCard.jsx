"use client";

import { LogOut, Mail, UserRound } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function AccountProfileCard() {
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
        <GlassCard className="relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/16 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-pink-300">Account Identity</p>
                        <h2 className="mt-1 text-2xl font-black text-white">
                            Developer Profile
                        </h2>
                    </div>

                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 via-orange-400 to-violet-600 text-lg font-black text-white shadow-lg shadow-pink-500/25">
                        {initials}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                        <div className="flex items-center gap-3">
                            <UserRound className="text-pink-300" size={20} />
                            <div>
                                <p className="text-xs text-[#a89bb8]">Name</p>
                                <p className="font-bold text-white">{user?.name || "Developer"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                        <div className="flex items-center gap-3">
                            <Mail className="text-orange-300" size={20} />
                            <div>
                                <p className="text-xs text-[#a89bb8]">Email</p>
                                <p className="font-bold text-white">{user?.email || "Not available"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:scale-[1.02] hover:bg-rose-400/15"
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </div>
        </GlassCard>
    );
}