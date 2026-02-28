"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/svg/Logo";
import { MenuIcon } from "@/svg/header/MenuIcon";
import { CrossIcon } from "@/svg/header/CrossIcon";
import type { ReactNode } from "react";

const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Manage Jobs", href: "/admin/jobs" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { logout, user } = useAuth();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [menuOpen]);

    return (
        <div className="flex min-h-screen bg-[#F8F8FD]">
            <aside className="hidden w-64 flex-col border-r border-[#D6DDEB] bg-white lg:flex">
                <div className="flex h-16 items-center px-6 border-b border-[#D6DDEB]">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-2xl font-bold text-[#25324B] font-(family-name:--font-clash)">
                            QuickHire
                        </span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors ${
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
                        className="w-full border border-[#D6DDEB] px-4 py-2 text-sm text-[#515B6F] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                <header
                    ref={headerRef}
                    className="relative flex h-16 items-center justify-between border-b border-[#D6DDEB] bg-white px-4 lg:hidden"
                >
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="text-xl font-bold text-[#25324B] font-(family-name:--font-clash)">
                            QuickHire
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="h-9 w-9 rounded-full bg-white flex items-center justify-center border border-[#D6DDEB] cursor-pointer z-50"
                    >
                        {menuOpen ? <CrossIcon /> : <MenuIcon />}
                    </button>

                    {menuOpen && (
                        <nav className="absolute left-0 right-0 top-full z-40 mx-4 mt-1 flex flex-col gap-1 border border-[#D6DDEB] bg-white p-4 shadow-lg">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                                        pathname === item.href
                                            ? "bg-[#4640DE]/10 text-[#4640DE]"
                                            : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="border-t border-[#D6DDEB] mt-2 pt-3">
                                <p className="px-4 text-xs text-[#7C8493] mb-2">
                                    Signed in as{" "}
                                    <span className="font-semibold text-[#25324B]">
                                        {user?.name}
                                    </span>
                                </p>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full border border-[#D6DDEB] px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </nav>
                    )}
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
