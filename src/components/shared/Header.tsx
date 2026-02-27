import { Logo } from "@/svg/Logo";
import { NavItems } from "@/utils/navItems";
import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="container mx-auto py-2 md:py-5.25 px-4">
            <div className="flex items-center md:gap-12">
                <div className="flex gap-2 items-center">
                    <Logo />
                    <span className="font-red-hat-display font-extrabold text-[24px]">
                        Quick Hire
                    </span>
                </div>

                {/* Desktop */}
                <div className="hidden md:block">
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

            <div>
                
            </div>
        </header>
    );
}
