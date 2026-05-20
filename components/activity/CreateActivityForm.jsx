"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { activityApi, projectApi } from "@/lib/api";

const initialForm = {
    project: "",
    type: "project",
    title: "",
    description: "",
    branch: "main",
    status: "created",
};

export default function CreateActivityForm({ open, onClose, onCreated }) {
    const [form, setForm] = useState(initialForm);
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadProjects() {
        try {
            setLoadingProjects(true);
            const data = await projectApi.getProjects();
            setProjects(data.projects || []);
        } catch (err) {
            setError(err.message || "Failed to load projects");
        } finally {
            setLoadingProjects(false);
        }
    }

    useEffect(() => {
        if (open) {
            loadProjects();
        }
    }, [open]);

    if (!open) return null;

    function updateField(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const payload = {
                ...form,
                project: form.project || null,
            };

            const data = await activityApi.createActivity(payload);

            onCreated(data.activity);
            setForm(initialForm);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to create activity");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[90] grid place-items-start overflow-y-auto bg-black/70 px-3 py-6 backdrop-blur-md sm:px-4 sm:py-10 md:place-items-center">
            <form
                onSubmit={handleSubmit}
                className="animated-gradient-border w-full max-w-2xl rounded-[2rem] bg-[#0b0614]/95 p-5 shadow-2xl shadow-pink-950/40 sm:p-6"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                            <Plus size={22} />
                        </div>

                        <h2 className="text-2xl font-black text-white">Add Activity</h2>

                        <p className="mt-2 text-sm text-[#a89bb8]">
                            Log a development event into your MongoDB-backed activity stream.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#a89bb8] transition hover:border-pink-300/30 hover:text-pink-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">Project optional</span>
                        <select
                            name="project"
                            value={form.project}
                            onChange={updateField}
                            disabled={loadingProjects}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40 disabled:opacity-60"
                        >
                            <option value="">No project / global activity</option>

                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Type</span>
                        <select
                            name="type"
                            value={form.type}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        >
                            <option value="commit">Commit</option>
                            <option value="pull_request">Pull Request</option>
                            <option value="issue">Issue</option>
                            <option value="deploy">Deploy</option>
                            <option value="review">Review</option>
                            <option value="bug">Bug</option>
                            <option value="task">Task</option>
                            <option value="project">Project</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Status</span>
                        <select
                            name="status"
                            value={form.status}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        >
                            <option value="created">Created</option>
                            <option value="success">Success</option>
                            <option value="merged">Merged</option>
                            <option value="warning">Warning</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </label>

                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">Title</span>
                        <input
                            name="title"
                            value={form.title}
                            onChange={updateField}
                            required
                            placeholder="Connected Activity page to MongoDB API"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Branch</span>
                        <input
                            name="branch"
                            value={form.branch}
                            onChange={updateField}
                            placeholder="main"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">Description</span>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={updateField}
                            rows={4}
                            placeholder="Describe what happened..."
                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>
                </div>

                {error && (
                    <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-[#cfc3dd] transition hover:border-pink-300/30 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
                        <span className="relative z-10 inline-flex items-center gap-2">
                            {loading && <Loader2 size={17} className="animate-spin" />}
                            Add Activity
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}