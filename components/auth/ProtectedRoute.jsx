"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { authLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [authLoading, isAuthenticated, pathname, router]);

    if (authLoading) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#06030f] px-6 text-white">
                <div className="premium-card rounded-[2rem] p-8 text-center">
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                        <Loader2 className="animate-spin" size={28} />
                    </div>

                    <p className="text-sm font-medium text-pink-300">
                        Verifying command access
                    </p>

                    <h1 className="mt-2 text-3xl font-black text-white">
                        Loading DevOrbit...
                    </h1>

                    <p className="mt-3 text-sm text-[#a89bb8]">
                        Checking your secure developer session.
                    </p>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#06030f] px-6 text-white">
                <div className="premium-card rounded-[2rem] p-8 text-center">
                    <ShieldCheck className="mx-auto mb-4 text-pink-300" size={36} />
                    <p className="text-[#a89bb8]">Redirecting to login...</p>
                </div>
            </main>
        );
    }

    return children;
}