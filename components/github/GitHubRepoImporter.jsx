"use client";

import { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    GitFork,
    Import,
    Loader2,
    Lock,
    Search,
    Star,
    Unlock,
} from "lucide-react";
import GitHubMark from "@/components/ui/GitHubMark";
import GlassCard from "@/components/ui/GlassCard";
import { githubApi } from "@/lib/api";

export default function GitHubRepoImporter({ onImported }) {
    const [repos, setRepos] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState("");

    async function loadRepos() {
        try {
            setLoading(true);
            setError("");

            const data = await githubApi.getRepos();
            setRepos(data.repos || []);
        } catch (err) {
            setError(err.message || "Failed to load GitHub repositories");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRepos();
    }, []);

    const filteredRepos = useMemo(() => {
        const search = query.toLowerCase();

        return repos.filter((repo) => {
            const text = `${repo.name} ${repo.fullName} ${repo.language} ${repo.description}`.toLowerCase();
            return text.includes(search);
        });
    }, [repos, query]);

    const selectedRepos = useMemo(() => {
        return repos.filter((repo) => selectedIds.includes(repo.id));
    }, [repos, selectedIds]);

    function toggleRepo(repo) {
        if (repo.alreadyImported) return;

        setSelectedIds((current) =>
            current.includes(repo.id)
                ? current.filter((id) => id !== repo.id)
                : [...current, repo.id]
        );
    }

    async function handleImport() {
        if (selectedRepos.length === 0) return;

        try {
            setImporting(true);
            setError("");

            const data = await githubApi.importRepos(selectedRepos);

            setSelectedIds([]);
            await loadRepos();

            onImported?.(data.projects || []);
        } catch (err) {
            setError(err.message || "Failed to import repositories");
        } finally {
            setImporting(false);
        }
    }

    if (loading) {
        return (
            <GlassCard>
                <Loader2 className="mb-3 animate-spin text-pink-300" size={24} />
                <p className="font-semibold text-white">Loading GitHub repositories...</p>
                <p className="mt-2 text-sm text-[#a89bb8]">
                    Fetching your repos from GitHub.
                </p>
            </GlassCard>
        );
    }

    if (error && repos.length === 0) {
        return (
            <GlassCard>
                <AlertTriangle className="mb-3 text-rose-300" size={24} />
                <p className="font-semibold text-white">Could not load repositories</p>
                <p className="mt-2 text-sm text-[#a89bb8]">{error}</p>

                <button
                    type="button"
                    onClick={loadRepos}
                    className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
                >
                    Retry
                </button>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pink-500/14 blur-3xl" />
            <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
                <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
                    <div>
                        <p className="text-sm text-pink-300">GitHub Repository Import</p>
                        <h2 className="mt-1 text-2xl font-black text-white">
                            Select repos to convert into DevOrbit projects
                        </h2>
                        <p className="mt-2 text-sm text-[#a89bb8]">
                            Imported repositories become MongoDB-backed projects and appear in
                            dashboard, orbit, activity, and insights.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleImport}
                        disabled={selectedRepos.length === 0 || importing}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />

                        <span className="relative z-10 inline-flex items-center gap-2">
                            {importing ? (
                                <Loader2 size={17} className="animate-spin" />
                            ) : (
                                <Import size={17} />
                            )}
                            Import {selectedRepos.length || ""} Repo
                            {selectedRepos.length === 1 ? "" : "s"}
                        </span>
                    </button>
                </div>

                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#a89bb8] transition focus-within:border-pink-300/30">
                    <Search size={18} className="text-pink-300" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search repositories..."
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#a89bb8]/60"
                    />
                </div>

                {error && (
                    <div className="mb-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}

                <div className="grid max-h-[32rem] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                    {filteredRepos.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-6 text-center md:col-span-2">
                            <GitHubMark className="mx-auto mb-3 text-pink-300" size={28} />
                            <p className="font-semibold text-white">No repositories found</p>
                            <p className="mt-2 text-sm text-[#a89bb8]">
                                Try a different search term.
                            </p>
                        </div>
                    ) : (
                        filteredRepos.map((repo) => {
                            const selected = selectedIds.includes(repo.id);

                            return (
                                <button
                                    key={repo.id}
                                    type="button"
                                    onClick={() => toggleRepo(repo)}
                                    disabled={repo.alreadyImported}
                                    className={`rounded-3xl border p-4 text-left transition ${repo.alreadyImported
                                        ? "cursor-not-allowed border-emerald-400/20 bg-emerald-400/10 opacity-75"
                                        : selected
                                            ? "border-pink-300/50 bg-pink-400/10 shadow-lg shadow-pink-500/10"
                                            : "border-white/10 bg-white/[0.045] hover:border-pink-300/30 hover:bg-white/[0.07]"
                                        }`}
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                {repo.private ? (
                                                    <Lock size={15} className="text-orange-300" />
                                                ) : (
                                                    <Unlock size={15} className="text-emerald-300" />
                                                )}

                                                <h3 className="truncate font-bold text-white">
                                                    {repo.name}
                                                </h3>
                                            </div>

                                            <p className="mt-1 truncate text-xs text-[#a89bb8]">
                                                {repo.fullName}
                                            </p>
                                        </div>

                                        {repo.alreadyImported ? (
                                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                                                <CheckCircle2 size={13} />
                                                Imported
                                            </span>
                                        ) : selected ? (
                                            <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-2.5 py-1 text-xs text-pink-200">
                                                Selected
                                            </span>
                                        ) : null}
                                    </div>

                                    <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-[#a89bb8]">
                                        {repo.description || "No description provided."}
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#a89bb8]">
                                        <span className="rounded-full border border-white/10 bg-[#140c23] px-2.5 py-1">
                                            {repo.language}
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#140c23] px-2.5 py-1">
                                            <Star size={12} />
                                            {repo.stars}
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#140c23] px-2.5 py-1">
                                            <GitFork size={12} />
                                            {repo.forks}
                                        </span>

                                        <span className="rounded-full border border-white/10 bg-[#140c23] px-2.5 py-1">
                                            Issues {repo.openIssues}
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </GlassCard>
    );
}