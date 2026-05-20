"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/components/auth/AuthProvider";
import GlowButton from "@/components/ui/GlowButton";

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";
    const { signup } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function updateField(event) {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signup(form);
            router.push(redirectTo);
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthShell
            eyebrow="Create your command identity"
            title="Start your developer universe"
            description="Create a DevOrbit account to track your projects, tasks, GitHub activity, and AI sprint intelligence."
        >
            <form
                onSubmit={handleSubmit}
                className="premium-card animated-gradient-border w-full rounded-[2rem] p-6"
            >
                <div className="mb-6">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                        <UserPlus size={23} />
                    </div>

                    <h2 className="text-2xl font-black text-white">Create account</h2>
                    <p className="mt-2 text-sm text-[#a89bb8]">
                        Your dashboard data will become user-specific after login.
                    </p>
                </div>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Name</span>
                        <input
                            name="name"
                            value={form.name}
                            onChange={updateField}
                            required
                            placeholder="Mustafa Malak"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Email</span>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={updateField}
                            required
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-[#cfc3dd]">Password</span>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={updateField}
                            required
                            minLength={6}
                            placeholder="Minimum 6 characters"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-[#a89bb8]/50 focus:border-pink-300/40"
                        />
                    </label>
                </div>

                {error && (
                    <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                        {loading && <Loader2 size={17} className="animate-spin" />}
                        Create DevOrbit account
                    </span>
                </button>

                <p className="mt-5 text-center text-sm text-[#a89bb8]">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-pink-300 hover:text-pink-200">
                        Login
                    </Link>
                </p>
            </form>
        </AuthShell>
    );
}