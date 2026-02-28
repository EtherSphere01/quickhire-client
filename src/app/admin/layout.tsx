"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/svg/Logo";
import type { ReactNode } from "react";

const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Manage Jobs", href: "/admin/jobs" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-[#F8F8FD]">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-[#D6DDEB] bg-white lg:flex">
                <div className="flex h-16 items-center px-6 border-b border-[#D6DDEB]">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                pathname === item.href
                                    ? "bg-[#4640DE]/10 text-[#4640DE]"
                                    : "text-[#515B6F] hover:bg-[#F8F8FD]"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-[#D6DDEB] p-4">
                    <p className="text-xs text-[#7C8493] mb-2">
                        Signed in as{" "}
                        <span className="font-semibold text-[#25324B]">
                            {user?.name}
                        </span>
                    </p>
                    <button
                        onClick={logout}
                        className="w-full rounded-lg border border-[#D6DDEB] px-4 py-2 text-sm text-[#515B6F] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-[#D6DDEB] bg-white px-4 lg:hidden">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium ${
                                    pathname === item.href
                                        ? "text-[#4640DE]"
                                        : "text-[#515B6F]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={logout}
                            className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
