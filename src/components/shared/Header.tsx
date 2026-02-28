"use client";

import { Logo } from "@/svg/Logo";
import { NavItems } from "@/content/navItems/navItems";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "@/svg/header/MenuIcon";
import { CrossIcon } from "@/svg/header/CrossIcon";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

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
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:flex items-center gap-4 h-12">
                    <Button
                        variant={"secondary"}
                        className="px-6 py-3 text-[16px] font-bold bg-transparent text-[#4640DE] "
                    >
                        Login
                    </Button>
                    <div className="border-l bg-[#D6DDEB] h-full"></div>
                    <Button className="px-6 py-3 text-[16px] font-bold ">
                        Sign Up
                    </Button>
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

                    <div className="flex flex-col gap-3 mt-2">
                        <Button
                            variant={"secondary"}
                            className="w-full px-6 py-3 text-[16px] font-bold bg-white text-[#4640DE] border border-[#4640DE]"
                        >
                            Login
                        </Button>
                        <Button className="w-full px-6 py-3 text-[16px] font-bold">
                            Sign Up
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    );
}
