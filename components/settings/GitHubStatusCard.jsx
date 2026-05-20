"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2, PlugZap, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GitHubMark from "@/components/ui/GitHubMark";
import { githubApi } from "@/lib/api";

export default function GitHubStatusCard() {
    const [github, setGithub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState("");

    async function loadStatus() {
        try {
            setLoading(true);
            setError("");
            const data = await githubApi.status();
            setGithub(data.github);
        } catch (err) {
            setError(err.message || "Failed to load GitHub status");
        } finally {
            setLoading(false);
        }
    }

    async function handleConnect() {
        try {
            setConnecting(true);
            setError("");
            const data = await githubApi.connect();
            window.location.href = data.authUrl;
        } catch (err) {
            setError(err.message || "Failed to connect GitHub");
            setConnecting(false);
        }
    }

    useEffect(() => {
        loadStatus();
    }, []);

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/14 blur-3xl" />

            <div className="relative">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-violet-300">GitHub Connection</p>
                        <h2 className="mt-1 text-2xl font-black text-white">
                            Repository Access
                        </h2>
                    </div>

                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white">
                        <GitHubMark size={24} />
                    </div>
                </div>

                {loading ? (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                        <Loader2 className="mb-3 animate-spin text-pink-300" size={24} />
                        <p className="font-semibold text-white">Checking connection...</p>
                    </div>
                ) : github?.connected ? (
                    <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                        <div className="flex items-center gap-3">
                            {github.avatar ? (
                                <img
                                    src={github.avatar}
                                    alt={github.username}
                                    className="h-12 w-12 rounded-2xl border border-white/10"
                                />
                            ) : (
                                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                                    <ShieldCheck className="text-emerald-300" size={22} />
                                </div>
                            )}

                            <div>
                                <p className="font-bold text-white">@{github.username}</p>
                                <p className="text-sm text-emerald-200">
                                    GitHub connected successfully
                                </p>
                            </div>
                        </div>

                        {github.profileUrl && (
                            <a
                                href={github.profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/15"
                            >
                                <ExternalLink size={16} />
                                Open GitHub Profile
                            </a>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="text-sm leading-7 text-[#cfc3dd]">
                            GitHub is not connected yet. Connect it to import repositories and
                            sync commits into your DevOrbit activity timeline.
                        </p>

                        <button
                            type="button"
                            onClick={handleConnect}
                            disabled={connecting}
                            className="group relative mt-5 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
                            <span className="relative z-10 inline-flex items-center gap-2">
                                {connecting ? (
                                    <Loader2 size={17} className="animate-spin" />
                                ) : (
                                    <PlugZap size={17} />
                                )}
                                Connect GitHub
                            </span>
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}
            </div>
        </GlassCard>
    );
}