import { API_BASE, type ApiResponse } from "./types";
import type { Application } from "./types";

export const applicationApi = {
    apply: async (body: {
        job_id: number;
        name: string;
        email: string;
        resume_link: string;
        cover_note: string;
    }): Promise<ApiResponse<Application>> => {
        const res = await fetch(`${API_BASE}/applications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message || "Failed to submit application");
        return data;
    },

    getByJobId: async (jobId: number): Promise<ApiResponse<Application[]>> => {
        const res = await fetch(`${API_BASE}/applications/job/${jobId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message || "Failed to fetch applications");
        return data;
    },
};
