import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Image from "next/image";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="relative overflow-hidden">
                <nav className="bg-[#F8F8FD]">
                    <Header />
                </nav>
                {children}

                {/* Pattern - Desktop */}
                <div className="hidden lg:block absolute top-[40] right-0 h-full w-[60%] pointer-events-none z-0">
                    <Image
                        src="/images/pattern.svg"
                        alt="Pattern"
                        width={1060}
                        height={794}
                        className="h-full w-full object-contain object-top-right"
                    />
                </div>

                {/* Pattern - Mobile */}
                <div className="lg:hidden absolute top-75 -right-8 pointer-events-none z-0">
                    <Image
                        src="/images/pattern.svg"
                        alt="Pattern"
                        width={400}
                        height={500}
                        className="w-70 h-auto"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
