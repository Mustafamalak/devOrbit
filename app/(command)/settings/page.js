import AccountProfileCard from "@/components/settings/AccountProfileCard";
import GitHubStatusCard from "@/components/settings/GitHubStatusCard";
import WorkspaceStatsCard from "@/components/settings/WorkspaceStatsCard";

export default function SettingsPage() {
    return (
        <div className="pb-10">
            <section className="mb-7">
                <p className="text-sm font-medium text-pink-300">Account Settings</p>

                <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
                    <div>
                        <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
                            Control <span className="text-gradient">Center</span>
                        </h1>

                        <p className="mt-3 max-w-3xl text-[#a89bb8]">
                            Manage your DevOrbit account identity, GitHub connection, and
                            workspace status from one place.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 px-4 py-3 text-sm text-pink-200">
                        Secure session active
                    </div>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <AccountProfileCard />

                <div className="space-y-6">
                    <GitHubStatusCard />
                    <WorkspaceStatsCard />
                </div>
            </section>
        </div>
    );
}