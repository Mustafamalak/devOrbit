"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    async function loadUser() {
        try {
            const data = await authApi.getMe();
            setUser(data.user);
        } catch {
            setUser(null);
            if (typeof window !== "undefined") {
                localStorage.removeItem("devorbit_token");
            }
        } finally {
            setAuthLoading(false);
        }
    }

    async function login(payload) {
        const data = await authApi.login(payload);

        if (data.token) {
            localStorage.setItem("devorbit_token", data.token);
        }

        setUser(data.user);
        return data;
    }

    async function signup(payload) {
        const data = await authApi.signup(payload);

        if (data.token) {
            localStorage.setItem("devorbit_token", data.token);
        }

        setUser(data.user);
        return data;
    }

    async function logout() {
        try {
            await authApi.logout();
        } finally {
            localStorage.removeItem("devorbit_token");
            setUser(null);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const value = useMemo(
        () => ({
            user,
            authLoading,
            isAuthenticated: Boolean(user),
            login,
            signup,
            logout,
            refreshUser: loadUser,
        }),
        [user, authLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}