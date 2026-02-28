import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";

let cachedJobs: Job[] | null = null;
let fetchPromise: Promise<Job[]> | null = null;

export async function getLandingJobs(): Promise<Job[]> {
    if (cachedJobs) return cachedJobs;

    if (!fetchPromise) {
        fetchPromise = jobApi
            .getAll({ limit: 16 })
            .then((res) => {
                cachedJobs = res.data ?? [];
                return cachedJobs;
            })
            .catch(() => {
                fetchPromise = null;
                return [] as Job[];
            });
    }

    return fetchPromise;
}

export function invalidateJobCache() {
    cachedJobs = null;
    fetchPromise = null;
}
