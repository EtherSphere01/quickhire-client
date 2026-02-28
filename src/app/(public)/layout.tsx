import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="bg-[#F8F8FD]">
                <Header />
            </nav>
            {children}
            <div className="bg-[#202430]">
                <Footer />
            </div>
        </div>
    );
}
