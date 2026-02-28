import { api } from "./client";
import type { User, ApiResponse } from "./types";

export const authApi = {
    login: (body: { email: string; password: string }) =>
        api.post<{ user: User }>("/auth/login", body),

    register: (body: { name: string; email: string; password: string }) =>
        api.post<User>("/auth/register", body),

    logout: () => api.post("/auth/logout"),

    refreshToken: () => api.post("/auth/refresh-token"),
};
