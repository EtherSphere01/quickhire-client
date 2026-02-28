import CompanyList from "@/components/modules/LandingPage/CompanyList";
import ExploreCategory from "@/components/modules/LandingPage/ExploreCategory";
import FeaturedJobs from "@/components/modules/LandingPage/FeaturedJobs";
import HeroSection from "@/components/modules/LandingPage/HeroSection";
import PostingJobsBanner from "@/components/modules/LandingPage/PostingJobsBanner";
import Image from "next/image";
import React from "react";

export default function Home() {
    return (
        <div className="">
            <div className="relative bg-[#F8F8FD] overflow-hidden">
                <HeroSection />

                {/* Pattern - Desktop */}
                <div className="hidden lg:block absolute top-0 right-0 h-full w-[60%] pointer-events-none z-0">
                    <Image
                        src="/images/pattern.svg"
                        alt="Pattern"
                        width={1060}
                        height={794}
                        className="h-full 2xl:h-185.5 w-full object-contain object-top-right"
                    />
                </div>

                {/* Pattern - Mobile */}
                <div className="lg:hidden absolute top-70 -right-30 h-full pointer-events-none z-0">
                    <Image
                        src="/images/pattern.svg"
                        alt="Pattern"
                        width={400}
                        height={500}
                        className="w-120 h-107"
                    />
                </div>
            </div>
            <div className="py-10 md:py-12">
                <CompanyList />
            </div>

            <div className="lg:pt-18 ">
                <ExploreCategory />
            </div>
            <div className="pt-10 lg:pt-18 ">
                <PostingJobsBanner />
            </div>
            <div className="pt-10 lg:pt-18  ">
                <FeaturedJobs />
            </div>
        </div>
    );
}
