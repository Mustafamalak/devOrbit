"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Save, X } from "lucide-react";
import { projectApi } from "@/lib/api";

const initialForm = {
    name: "",
    category: "Developer Project",
    description: "",
    status: "Prototype",
    priority: "Medium",
    health: 70,
    progress: 0,
    deadline: "No deadline",
    stack: "",
    bugsCount: 0,
    commitsCount: 0,
};

function buildFormFromProject(project) {
    if (!project) return initialForm;

    return {
        name: project.name || "",
        category: project.category || "Developer Project",
        description: project.description || "",
        status: project.status || "Prototype",
        priority: project.priority || "Medium",
        health: project.health ?? 70,
        progress: project.progress ?? 0,
        deadline: project.deadline || "No deadline",
        stack: Array.isArray(project.stack) ? project.stack.join(", ") : "",
        bugsCount: project.bugsCount ?? 0,
        commitsCount: project.commitsCount ?? 0,
    };
}

export default function CreateProjectForm({
    open,
    onClose,
    onCreated,
    onUpdated,
    editProject = null,
}) {
    const isEditMode = Boolean(editProject);

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setForm(buildFormFromProject(editProject));
            setError("");
        }
    }, [open, editProject]);

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
                health: Number(form.health),
                progress: Number(form.progress),
                bugsCount: Number(form.bugsCount),
                commitsCount: Number(form.commitsCount),
                stack: form.stack
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            if (isEditMode) {
                const data = await projectApi.updateProject(editProject._id, payload);
                onUpdated?.(data.project);
            } else {
                const data = await projectApi.createProject(payload);
                onCreated?.(data.project);
            }

            setForm(initialForm);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to save project");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[90] grid place-items-start overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-md md:place-items-center">
            <form
                onSubmit={handleSubmit}
                className="animated-gradient-border w-full max-w-2xl rounded-[2rem] bg-[#0b0614]/95 p-6 shadow-2xl shadow-pink-950/40"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                            {isEditMode ? <Save size={22} /> : <Plus size={22} />}
                        </div>

                        <h2 className="text-2xl font-black text-white">
                            {isEditMode ? "Edit Project System" : "Add Project System"}
                        </h2>

                        <p className="mt-2 text-sm text-[#a89bb8]">
                            {isEditMode
                                ? "Update this MongoDB-backed project system."
                                : "Create a user-specific project that appears in your project fleet and orbit map."}
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
                        <span className="text-sm text-[#cfc3dd]">Project Name</span>
                        <input
                            name="name"
                            value={form.name}
                            onChange={updateField}
                            required
                            placeholder="DevOrbit"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Category</span>
                        <input
                            name="category"
                            value={form.category}
                            onChange={updateField}
                            placeholder="Full-stack Platform"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Deadline</span>
                        <input
                            name="deadline"
                            value={form.deadline}
                            onChange={updateField}
                            placeholder="30 May 2026"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Status</span>
                        <select
                            name="status"
                            value={form.status}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        >
                            <option>Healthy</option>
                            <option>Warning</option>
                            <option>Critical</option>
                            <option>Prototype</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Priority</span>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Health Score</span>
                        <input
                            name="health"
                            type="number"
                            min="0"
                            max="100"
                            value={form.health}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Progress</span>
                        <input
                            name="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={form.progress}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Bugs Count</span>
                        <input
                            name="bugsCount"
                            type="number"
                            min="0"
                            value={form.bugsCount}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Commits Count</span>
                        <input
                            name="commitsCount"
                            type="number"
                            min="0"
                            value={form.commitsCount}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">
                            Stack, comma separated
                        </span>
                        <input
                            name="stack"
                            value={form.stack}
                            onChange={updateField}
                            placeholder="Next.js, React, Express, MongoDB"
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
                            placeholder="Describe what this project solves..."
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
                            {isEditMode ? "Save Changes" : "Create Project"}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}