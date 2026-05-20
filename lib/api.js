const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiRequest(endpoint, options = {}) {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("devorbit_token") : null;

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

export const authApi = {
    signup: (payload) =>
        apiRequest("/auth/signup", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    login: (payload) =>
        apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    logout: () =>
        apiRequest("/auth/logout", {
            method: "POST",
        }),

    getMe: () => apiRequest("/auth/me"),
};