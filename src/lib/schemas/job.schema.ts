import { z } from "zod/v3";

export const jobSchema = z.object({
    title: z.string().min(2, "Title is required"),
    company: z.string().min(2, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    category: z.string().min(1, "Category is required"),
    job_type: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE",
    ]),
    salary: z.string().optional(),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
});

export type JobFormValues = z.infer<typeof jobSchema>;
