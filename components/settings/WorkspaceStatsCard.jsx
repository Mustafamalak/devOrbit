"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, FolderKanban, Loader2, ListTodo } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { activityApi, projectApi, taskApi } from "@/lib/api";

export default function WorkspaceStatsCard() {
    const [stats, setStats] = useState({
        projects: 0,
        tasks: 0,
        activities: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadStats() {
        try {
            setLoading(true);
            setError("");

            const [projectData, taskData, activityData] = await Promise.all([
                projectApi.getProjects(),
                taskApi.getTasks(),
                activityApi.getActivities(),
            ]);

            setStats({
                projects: projectData.projects?.length || 0,
                tasks: taskData.tasks?.length || 0,
                activities: activityData.activities?.length || 0,
            });
        } catch (err) {
            setError(err.message || "Failed to load workspace stats");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStats();
    }, []);

    const items = [
        {
            label: "Projects",
            value: stats.projects,
            icon: FolderKanban,
            tone: "text-pink-300",
        },
        {
            label: "Tasks",
            value: stats.tasks,
            icon: ListTodo,
            tone: "text-orange-300",
        },
        {
            label: "Activity",
            value: stats.activities,
            icon: Activity,
            tone: "text-emerald-300",
        },
    ];

    return (
        <GlassCard>
            <div className="mb-6">
                <p className="text-sm text-orange-300">Workspace Stats</p>
                <h2 className="mt-1 text-2xl font-black text-white">
                    Account Data Footprint
                </h2>
            </div>

            {loading ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                    <Loader2 className="mb-3 animate-spin text-pink-300" size={24} />
                    <p className="font-semibold text-white">Loading stats...</p>
                </div>
            ) : error ? (
                <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5">
                    <AlertTriangle className="mb-3 text-rose-300" size={24} />
                    <p className="font-semibold text-white">Stats failed</p>
                    <p className="mt-2 text-sm text-rose-200">{error}</p>
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-3">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="rounded-3xl border border-white/10 bg-white/[0.045] p-4"
                            >
                                <Icon className={item.tone} size={20} />
                                <p className="mt-4 text-3xl font-black text-white">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-sm text-[#a89bb8]">{item.label}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </GlassCard>
    );
}