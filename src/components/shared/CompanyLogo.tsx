import Image from "next/image";
import { getCompanyLogo } from "@/lib/company-logos";

interface CompanyLogoProps {
    company: string;
    logoUrl?: string | null;
    size?: number;
    className?: string;
}

export default function CompanyLogo({
    company,
    logoUrl,
    size = 48,
    className = "",
}: CompanyLogoProps) {
    const resolvedLogo = getCompanyLogo(company, logoUrl);

    if (resolvedLogo) {
        return (
            <Image
                src={resolvedLogo}
                alt={company}
                width={size}
                height={size}
                className={`object-contain ${className}`}
            />
        );
    }

    return (
        <div
            className={`flex items-center justify-center bg-[#F8F8FD] font-bold text-[#4640DE] ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
            {company[0]}
        </div>
    );
}
