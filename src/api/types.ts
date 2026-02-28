export const API_BASE = "/api";

export type ApiResponse<T = unknown> = {
    success: boolean;
    message: string;
    data?: T;
};

export type JobType =
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "INTERNSHIP"
    | "FREELANCE";

export type Role = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface Job {
    id: number;
    title: string;
    company: string;
    company_logo: string | null;
    location: string;
    category: string;
    job_type: JobType;
    salary: number | null;
    description: string;
    isDeleted: boolean;
    created_at: string;
    updated_at: string;
    applications?: Application[];
}

export interface Application {
    id: number;
    job_id: number;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
    created_at: string;
    updated_at: string;
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
    FREELANCE: "Freelance",
};

export const CATEGORY_OPTIONS = [
    "Design",
    "Sales",
    "Marketing",
    "Finance",
    "Technology",
    "Engineering",
    "Business",
    "Human Resource",
];
