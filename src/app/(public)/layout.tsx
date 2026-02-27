import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
