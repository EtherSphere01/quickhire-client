import { z } from "zod/v3";

export const applySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    resume_link: z.string().url("Enter a valid URL for your resume"),
    cover_note: z.string().min(10, "Cover note must be at least 10 characters"),
});

export type ApplyValues = z.infer<typeof applySchema>;
