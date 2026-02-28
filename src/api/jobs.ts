import { API_BASE, type ApiResponse } from "./types";
import type { Job } from "./types";

export type JobQueryParams = {
    search?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
};

export const jobApi = {
    getAll: async (params?: JobQueryParams): Promise<ApiResponse<Job[]>> => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.set("search", params.search);
        if (params?.location) searchParams.set("location", params.location);
        if (params?.category) searchParams.set("category", params.category);
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        const qs = searchParams.toString();

        const res = await fetch(`${API_BASE}/jobs${qs ? `?${qs}` : ""}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");
        return data;
    },

    getById: async (id: number): Promise<ApiResponse<Job>> => {
        const res = await fetch(`${API_BASE}/jobs/${id}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch job");
        return data;
    },

    create: async (formData: FormData): Promise<ApiResponse<Job>> => {
        const res = await fetch(`${API_BASE}/jobs`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to create job");
        return data;
    },

    update: async (
        id: number,
        formData: FormData,
    ): Promise<ApiResponse<Job>> => {
        const res = await fetch(`${API_BASE}/jobs/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update job");
        return data;
    },

    delete: async (id: number): Promise<ApiResponse> => {
        const res = await fetch(`${API_BASE}/jobs/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to delete job");
        return data;
    },
};
