import {
    AMDLogo,
    IntelLogo,
    TalkitLogo,
    TeslaLogo,
    VodafoneLogo,
} from "@/svg/LandingPage/CompanyLogos";
import React, { type ComponentType } from "react";

const companyLogos: ComponentType[] = [
    VodafoneLogo,
    IntelLogo,
    TeslaLogo,
    AMDLogo,
    TalkitLogo,
];

export default function CompanyList() {
    return (
        <div className="container mx-auto px-4">
            <div>
                <p className="text-[18px] font-normal text-[#202430]/50">
                    Companies we helped grow
                </p>
            </div>
            <div className="mt-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-10">
                {companyLogos.map((Logo, index) => (
                    <Logo key={index} />
                ))}
            </div>
        </div>
    );
}
