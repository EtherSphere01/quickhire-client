"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { authApi } from "@/api/auth";
import type { User } from "@/api/types";
import Cookies from "js-cookie";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const hydrateUser = useCallback(async () => {
        try {
            const stored = Cookies.get("user");
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch {
            setUser(null);
            Cookies.remove("user");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        hydrateUser();
    }, [hydrateUser]);

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        if (res.data?.user) {
            const u = res.data.user;
            setUser(u);
            Cookies.set("user", JSON.stringify(u), { expires: 30 });
        }
    };

    const register = async (name: string, email: string, password: string) => {
        await authApi.register({ name, email, password });
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            setUser(null);
            Cookies.remove("user");
            window.location.href = "/";
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAdmin: user?.role === "ADMIN",
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
