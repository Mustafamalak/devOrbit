"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Filter, Loader2, Plus, Search } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import CreateProjectForm from "@/components/projects/CreateProjectForm";
import { projectApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const filters = ["All", "Healthy", "Warning", "Critical", "Prototype"];

function normalizeProject(project) {
  return {
    id: project._id,
    _id: project._id,
    name: project.name,
    category: project.category,
    status: project.status,
    health: project.health,
    progress: project.progress,
    priority: project.priority,
    deadline: project.deadline,
    description: project.description,
    stack: project.stack || [],
    tasks: project.tasksCount || 0,
    bugs: project.bugsCount || 0,
    commits: project.commitsCount || 0,
  };
}

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");
      const data = await projectApi.getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleCreated(project) {
    setProjects((current) => [project, ...current]);
  }

  const normalizedProjects = useMemo(() => {
    return projects.map(normalizeProject);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return normalizedProjects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.status === activeFilter;

      const searchValue = `${project.name} ${project.category} ${project.stack.join(
        " "
      )}`.toLowerCase();

      const matchesSearch = searchValue.includes(query.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query, normalizedProjects]);

  return (
    <div>
      <CreateProjectForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />

      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#cfc3dd]">
            <Filter size={16} className="text-pink-300" />
            Filter Systems
          </div>

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeFilter === filter
                  ? "border-pink-300/40 bg-pink-400/10 text-pink-200 shadow-lg shadow-pink-500/10"
                  : "border-white/10 bg-white/5 text-[#a89bb8] hover:border-pink-300/30 hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#a89bb8] transition focus-within:border-pink-300/30 xl:w-80">
            <Search size={18} className="text-pink-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#a89bb8]/60"
              placeholder="Search projects or stack..."
            />
          </div>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
          >
            <Plus size={17} />
            Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />
          <p className="text-lg font-semibold text-white">Loading projects</p>
          <p className="mt-2 text-[#a89bb8]">
            Fetching your project fleet from MongoDB.
          </p>
        </div>
      ) : error ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">Could not load projects</p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>
          <button
            type="button"
            onClick={loadProjects}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <p className="text-lg font-semibold text-white">
            {projects.length === 0 ? "No projects yet" : "No systems found"}
          </p>
          <p className="mt-2 text-[#a89bb8]">
            {projects.length === 0
              ? "Create your first project system to personalize DevOrbit."
              : "Try changing the search term or status filter."}
          </p>

          {projects.length === 0 && (
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
            >
              <Plus size={17} />
              Create First Project
            </button>
          )}
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}