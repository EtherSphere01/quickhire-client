import { API_BASE, type ApiResponse } from "./types";
import type { User } from "./types";

export const authApi = {
    login: async (body: {
        email: string;
        password: string;
    }): Promise<ApiResponse<{ user: User }>> => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        return data;
    },

    register: async (body: {
        name: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<User>> => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");
        return data;
    },

    logout: async (): Promise<ApiResponse> => {
        const res = await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Logout failed");
        return data;
    },

    refreshToken: async (): Promise<ApiResponse> => {
        const res = await fetch(`${API_BASE}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Token refresh failed");
        return data;
    },
};
