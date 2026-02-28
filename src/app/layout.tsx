import type { Metadata } from "next";
import { Epilogue, Red_Hat_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const epilogue = Epilogue({
    variable: "--font-epilogue",
    subsets: ["latin"],
});

const redHatDisplay = Red_Hat_Display({
    variable: "--font-red-hat-display",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "QuickHire – Find Your Dream Job",
    description:
        "QuickHire is a modern job board connecting talent with opportunity.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
                />
            </head>
            <body
                className={`${epilogue.variable} ${redHatDisplay.variable} font-sans antialiased`}
            >
                <AuthProvider>
                    {children}
                    <Toaster richColors position="top-right" />
                </AuthProvider>
            </body>
        </html>
    );
}
