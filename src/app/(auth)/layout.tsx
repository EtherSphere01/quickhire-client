import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F8F8FD] to-white px-4">
            {children}
        </div>
    );
}
