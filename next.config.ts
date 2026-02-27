import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.10.132", "0.0.0.0"],
};

export default nextConfig;
