import { z } from "zod/v3";

export const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type SignupValues = z.infer<typeof signupSchema>;
