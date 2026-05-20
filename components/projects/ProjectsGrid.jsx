"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectsPageData } from "@/data/mockData";
import { cn } from "@/lib/utils";

const filters = ["All", "Healthy", "Warning", "Critical"];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsPageData.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.status === activeFilter;

      const searchValue = `${project.name} ${project.category} ${project.stack.join(
        " "
      )}`.toLowerCase();

      const matchesSearch = searchValue.includes(query.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  return (
    <div>
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

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#a89bb8] transition focus-within:border-pink-300/30 xl:w-80">
          <Search size={18} className="text-pink-300" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#a89bb8]/60"
            placeholder="Search projects or stack..."
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <p className="text-lg font-semibold text-white">No systems found</p>
          <p className="mt-2 text-[#a89bb8]">
            Try changing the search term or status filter.
          </p>
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