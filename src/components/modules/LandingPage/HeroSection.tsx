import { Lines } from "@/svg/LandingPage/Lines";
import Image from "next/image";
import React from "react";
import SearchBox from "./SearchBox";

export default function HeroSection() {
    return (
        <div className="container mx-auto relative overflow-visible px-4">
            <div className="flex justify-between">
                <div>
                    <div className="pt-2.5  w-85.75 md:w-120 lg:w-133.25 ">
                        <h1 className="text-[48px] md:text-[72px] text-[#25324B] font-semibold mt-4 lg:mt-20.5 leading-[110%] tracking-[0%]">
                            Discover more than
                            <span className="text-[#26A4FF]"> 5000+ Jobs</span>
                        </h1>
                        <div className="hidden lg:block mt-3">
                            <Lines />
                        </div>
                        <div className="lg:hidden mt-2">
                            <Lines width={344} height={40} />
                        </div>
                    </div>

                    <p className="w-full lg:w-130.25 text-[18px] md:text-[20px] font-normal text-[#515B6F] leading-[160%]">
                        Great platform for the job seeker that searching for new
                        career heights and passionate about startups.
                    </p>

                    <div className="lg:absolute z-50">
                        <SearchBox />
                    </div>
                </div>

                <div className="hidden lg:block z-30 relative">
                    <Image
                        src="/images/HeroImage.png"
                        alt="Hero Image"
                        width={501}
                        height={707}
                        className="z-30 h-full"
                    />
                    <div className="w-70.75 h-200 bg-white absolute top-80 left-70 rotate-60"></div>
                </div>
            </div>
        </div>
    );
}
