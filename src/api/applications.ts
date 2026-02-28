import { api } from "./client";
import type { Application } from "./types";

export const applicationApi = {
    apply: (body: {
        job_id: number;
        name: string;
        email: string;
        resume_link: string;
        cover_note: string;
    }) => api.post<Application>("/applications", body),

    getByJobId: (jobId: number) =>
        api.get<Application[]>(`/applications/job/${jobId}`),
};
