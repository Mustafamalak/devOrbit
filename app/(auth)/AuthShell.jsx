import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthShell({ children, eyebrow, title, description }) {
    return (
        <main className="relative grid min-h-screen overflow-hidden px-6 py-10 text-white lg:grid-cols-[1.05fr_0.95fr]">
            <div className="fixed inset-0 -z-20 bg-[#06030f]" />
            <div className="fixed inset-0 -z-10 grid-bg opacity-25" />
            <div className="fixed left-[-10%] top-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-pink-500/20 blur-3xl" />
            <div className="fixed bottom-[-10%] right-[-8%] -z-10 h-[36rem] w-[36rem] rounded-full bg-orange-500/16 blur-3xl" />
            <div className="fixed left-[40%] top-[30%] -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/14 blur-3xl" />

            <section className="mx-auto flex w-full max-w-xl flex-col justify-center">
                <Link href="/" className="mb-10 flex w-fit items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 via-orange-400 to-violet-600 text-white shadow-lg shadow-pink-500/30">
                        <Sparkles size={24} />
                    </div>

                    <div>
                        <p className="text-xl font-black">DevOrbit</p>
                        <p className="text-xs text-[#a89bb8]">Developer Command Center</p>
                    </div>
                </Link>

                <p className="text-sm font-medium text-pink-300">{eyebrow}</p>

                <h1 className="glow-text mt-3 text-5xl font-black tracking-tight md:text-6xl">
                    {title}
                </h1>

                <p className="mt-5 max-w-lg text-[#a89bb8]">{description}</p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {[
                        ["3D Orbit", "Project universe"],
                        ["AI Brief", "Sprint summary"],
                        ["GitHub", "Repo import"],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="premium-card rounded-3xl p-4"
                        >
                            <p className="text-xs text-[#a89bb8]">{label}</p>
                            <p className="mt-1 text-sm font-bold text-white">{value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto flex w-full max-w-md items-center justify-center py-10">
                {children}
            </section>
        </main>
    );
}