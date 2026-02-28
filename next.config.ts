import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.10.132", "0.0.0.0"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
            },
        ];
    },
};

export default nextConfig;
