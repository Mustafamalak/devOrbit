"use client";

import dynamic from "next/dynamic";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { projectApi } from "@/lib/api";

const ProjectOrbitScene = dynamic(() => import("./ProjectOrbitScene"), {
  ssr: false,
  loading: () => (
    <div className="premium-card grid min-h-[28rem] place-items-center rounded-[2rem] p-10 text-center">
      <div>
        <Loader2
          className="mx-auto mb-4 animate-spin text-pink-300"
          size={34}
        />
        <p className="text-lg font-semibold text-white">
          Loading 3D orbit engine
        </p>
        <p className="mt-2 text-[#a89bb8]">
          Initializing your project universe.
        </p>
      </div>
    </div>
  ),
});

export default function ProjectOrbitClient() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoadingProjects(true);
      setError("");

      const data = await projectApi.getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message || "Failed to load orbit projects");
    } finally {
      setLoadingProjects(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  if (loadingProjects) {
    return (
      <div className="premium-card grid min-h-[28rem] place-items-center rounded-[2rem] p-10 text-center">
        <div>
          <Loader2
            className="mx-auto mb-4 animate-spin text-pink-300"
            size={34}
          />
          <p className="text-lg font-semibold text-white">
            Fetching project planets
          </p>
          <p className="mt-2 text-[#a89bb8]">
            Loading your MongoDB-backed project universe.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="premium-card grid min-h-[28rem] place-items-center rounded-[2rem] p-10 text-center">
        <div>
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">
            Could not load orbit
          </p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>

          <button
            type="button"
            onClick={loadProjects}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <ProjectOrbitScene projects={projects} />;
}