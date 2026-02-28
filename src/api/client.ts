import { API_BASE, type ApiResponse } from "./types";

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<ApiResponse<T>> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        credentials: "include",
        headers: {
            ...(options.body instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
            ...options.headers,
        },
        ...options,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export const api = {
    get: <T>(endpoint: string, init?: RequestInit) =>
        request<T>(endpoint, { method: "GET", ...init }),

    post: <T>(endpoint: string, body?: unknown, init?: RequestInit) =>
        request<T>(endpoint, {
            method: "POST",
            body: body instanceof FormData ? body : JSON.stringify(body),
            ...init,
        }),

    patch: <T>(endpoint: string, body?: unknown, init?: RequestInit) =>
        request<T>(endpoint, {
            method: "PATCH",
            body: body instanceof FormData ? body : JSON.stringify(body),
            ...init,
        }),

    delete: <T>(endpoint: string, init?: RequestInit) =>
        request<T>(endpoint, { method: "DELETE", ...init }),
};
