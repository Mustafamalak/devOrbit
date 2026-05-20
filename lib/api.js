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

export const projectApi = {
    getProjects: () => apiRequest("/projects"),

    getProjectById: (id) => apiRequest(`/projects/${id}`),

    createProject: (payload) =>
        apiRequest("/projects", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    updateProject: (id, payload) =>
        apiRequest(`/projects/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    deleteProject: (id) =>
        apiRequest(`/projects/${id}`, {
            method: "DELETE",
        }),
};

export const taskApi = {
    getTasks: () => apiRequest("/tasks"),

    createTask: (payload) =>
        apiRequest("/tasks", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    updateTask: (id, payload) =>
        apiRequest(`/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    deleteTask: (id) =>
        apiRequest(`/tasks/${id}`, {
            method: "DELETE",
        }),
};

export const activityApi = {
    getActivities: () => apiRequest("/activity"),

    createActivity: (payload) =>
        apiRequest("/activity", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
};

export const githubApi = {
    connect: () => apiRequest("/github/connect"),

    status: () => apiRequest("/github/status"),
};