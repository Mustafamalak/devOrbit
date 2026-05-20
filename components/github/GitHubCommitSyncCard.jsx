"use client";

import { useState } from "react";
import { GitCommit, Loader2, RefreshCcw, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { githubApi } from "@/lib/api";

export default function GitHubCommitSyncCard({ onSynced }) {
    const [syncing, setSyncing] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    async function handleSync() {
        try {
            setSyncing(true);
            setError("");
            setResult("");

            const data = await githubApi.syncCommits();

            setResult(data.message || "Commits synced successfully");
            onSynced?.(data.activities || []);
        } catch (err) {
            setError(err.message || "Failed to sync commits");
        } finally {
            setSyncing(false);
        }
    }

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/14 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                        <GitCommit size={23} />
                    </div>

                    <p className="text-sm text-pink-300">GitHub Commit Sync</p>

                    <h2 className="mt-1 text-2xl font-black text-white">
                        Pull latest commits into Activity
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a89bb8]">
                        Sync recent commits from imported GitHub repositories. New commits
                        become DevOrbit activity events and update project commit counts.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSync}
                    disabled={syncing}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />

                    <span className="relative z-10 inline-flex items-center gap-2">
                        {syncing ? (
                            <Loader2 size={17} className="animate-spin" />
                        ) : (
                            <RefreshCcw size={17} />
                        )}
                        Sync Commits
                    </span>
                </button>
            </div>

            {result && (
                <div className="relative mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    <span className="inline-flex items-center gap-2">
                        <Sparkles size={16} />
                        {result}
                    </span>
                </div>
            )}

            {error && (
                <div className="relative mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                    {error}
                </div>
            )}
        </GlassCard>
    );
}