"use client";

import GitHubConnectCard from "@/components/github/GitHubConnectCard";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export default function ProjectsPageClient() {
    function handleImported() {
        window.location.reload();
    }

    return (
        <>
            <section className="mb-6">
                <GitHubConnectCard onImported={handleImported} />
            </section>

            <ProjectsGrid />
        </>
    );
}