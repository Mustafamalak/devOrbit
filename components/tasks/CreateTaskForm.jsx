"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { projectApi, taskApi } from "@/lib/api";

const initialForm = {
    project: "",
    title: "",
    description: "",
    status: "backlog",
    priority: "Medium",
    dueDate: "No due date",
    points: 3,
    tags: "",
};

export default function CreateTaskForm({ open, onClose, onCreated }) {
    const [form, setForm] = useState(initialForm);
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadProjects() {
        try {
            setLoadingProjects(true);
            const data = await projectApi.getProjects();
            const fetchedProjects = data.projects || [];

            setProjects(fetchedProjects);

            if (fetchedProjects.length > 0) {
                setForm((current) => ({
                    ...current,
                    project: current.project || fetchedProjects[0]._id,
                }));
            }
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

        if (!form.project) {
            setError("Create a project first before adding tasks.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...form,
                points: Number(form.points),
                tags: form.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            const data = await taskApi.createTask(payload);

            onCreated(data.task);
            setForm(initialForm);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to create task");
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
                            <Plus size={22} />
                        </div>

                        <h2 className="text-2xl font-black text-white">Create Task</h2>

                        <p className="mt-2 text-sm text-[#a89bb8]">
                            Add a task to one of your MongoDB-backed project systems.
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
                        <span className="text-sm text-[#cfc3dd]">Project</span>
                        <select
                            name="project"
                            value={form.project}
                            onChange={updateField}
                            disabled={loadingProjects || projects.length === 0}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#140c23] px-4 py-3 text-white outline-none transition focus:border-pink-300/40 disabled:opacity-60"
                        >
                            {loadingProjects ? (
                                <option>Loading projects...</option>
                            ) : projects.length === 0 ? (
                                <option>No projects found</option>
                            ) : (
                                projects.map((project) => (
                                    <option key={project._id} value={project._id}>
                                        {project.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>

                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">Task Title</span>
                        <input
                            name="title"
                            value={form.title}
                            onChange={updateField}
                            required
                            placeholder="Connect Tasks page to MongoDB"
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
                            <option value="backlog">Backlog</option>
                            <option value="progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
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
                        <span className="text-sm text-[#cfc3dd]">Due Date</span>
                        <input
                            name="dueDate"
                            value={form.dueDate}
                            onChange={updateField}
                            placeholder="Today"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Story Points</span>
                        <input
                            name="points"
                            type="number"
                            min="1"
                            max="21"
                            value={form.points}
                            onChange={updateField}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block md:col-span-2">
                        <span className="text-sm text-[#cfc3dd]">
                            Tags, comma separated
                        </span>
                        <input
                            name="tags"
                            value={form.tags}
                            onChange={updateField}
                            placeholder="API, Frontend, MongoDB"
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
                            placeholder="Write the implementation goal..."
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
                        disabled={loading || loadingProjects || projects.length === 0}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
                        <span className="relative z-10 inline-flex items-center gap-2">
                            {loading && <Loader2 size={17} className="animate-spin" />}
                            Create Task
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}