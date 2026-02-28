import { api } from "./client";
import type { Job } from "./types";

export type JobQueryParams = {
    search?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
};

export const jobApi = {
    getAll: (params?: JobQueryParams) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.set("search", params.search);
        if (params?.location) searchParams.set("location", params.location);
        if (params?.category) searchParams.set("category", params.category);
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        const qs = searchParams.toString();
        return api.get<Job[]>(`/jobs${qs ? `?${qs}` : ""}`);
    },

    getById: (id: number) => api.get<Job>(`/jobs/${id}`),

    create: (formData: FormData) => api.post<Job>("/jobs", formData),

    update: (id: number, formData: FormData) =>
        api.patch<Job>(`/jobs/${id}`, formData),

    delete: (id: number) => api.delete(`/jobs/${id}`),
};
