"use client";

import { Logo } from "@/svg/Logo";
import { NavItems } from "@/content/navItems/navItems";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@/svg/header/MenuIcon";
import { CrossIcon } from "@/svg/header/CrossIcon";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const { user, isAdmin, isAuthenticated, logout, isLoading } = useAuth();

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
        <header
            ref={headerRef}
            className="relative container mx-auto py-2 md:py-5.25 px-4 z-30"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center md:gap-12">
                    <div className="flex gap-2 items-center">
                        <Logo />
                        <Link
                            href="/"
                            className="font-red-hat-display font-extrabold text-[24px]"
                        >
                            Quick Hire
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:block">
                        {NavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="ml-6 text-[16px] font-medium text-[#515B6F] hover:text-gray-800"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="ml-6 text-[16px] font-medium text-[#4640DE] hover:text-[#3530c9]"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:flex items-center gap-4 h-12">
                    {isLoading ? (
                        <div className="h-5 w-24 animate-pulse rounded bg-[#D6DDEB]" />
                    ) : isAuthenticated ? (
                        <>
                            <span className="text-sm text-[#515B6F]">
                                Hi,{" "}
                                <span className="font-semibold text-[#25324B]">
                                    {user?.name}
                                </span>
                            </span>
                            <div className="border-l bg-[#D6DDEB] h-full" />
                            <Button
                                onClick={logout}
                                variant="secondary"
                                className="px-6 py-3 text-[16px] font-bold bg-transparent text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="secondary"
                                    className="px-6 py-3 text-[16px] font-bold bg-transparent text-[#4640DE] cursor-pointer"
                                >
                                    Login
                                </Button>
                            </Link>
                            <div className="border-l bg-[#D6DDEB] h-full" />
                            <Link href="/signup">
                                <Button className="px-6 py-3 text-[16px] font-bold cursor-pointer">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="lg:hidden h-9 w-9 rounded-full bg-white flex items-center justify-center border border-[#D6DDEB] cursor-pointer z-50"
                >
                    {menuOpen ? <CrossIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {menuOpen && (
                <nav className="lg:hidden absolute left-0 right-0 top-full z-40 mx-4 mt-1 flex flex-col gap-4 rounded-lg border border-[#D6DDEB] bg-white p-4 shadow-lg">
                    {NavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-[16px] font-medium text-[#515B6F] hover:text-gray-800"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            onClick={() => setMenuOpen(false)}
                            className="text-[16px] font-medium text-[#4640DE]"
                        >
                            Admin Panel
                        </Link>
                    )}

                    <div className="flex flex-col gap-3 mt-2">
                        {isAuthenticated ? (
                            <>
                                <p className="text-sm text-center text-[#515B6F]">
                                    {user?.name} ({user?.role})
                                </p>
                                <Button
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                    variant="secondary"
                                    className="w-full px-6 py-3 text-[16px] font-bold bg-white text-red-500 border border-red-500 cursor-pointer"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)}>
                                    <Button
                                        variant="secondary"
                                        className="w-full px-6 py-3 text-[16px] font-bold bg-white text-[#4640DE] border border-[#4640DE] cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                                    <Button className="w-full px-6 py-3 text-[16px] font-bold cursor-pointer">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
