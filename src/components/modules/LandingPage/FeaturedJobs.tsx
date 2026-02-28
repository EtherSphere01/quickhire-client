"use client";

import { FeaturedJobsData } from "@/content/landingPage/FeaturedJobs";
import { useState } from "react";
import FeatureJobCard from "./FeatureJobCard";
import ShowAllJobsButton from "./ShowAllJobsButton";

export default function FeaturedJobs() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? FeaturedJobsData.length - 1 : prev - 1,
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === FeaturedJobsData.length - 1 ? 0 : prev + 1,
        );
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end">
                <h1 className="text-[32px] md:text-[48px] font-semibold">
                    Featured <span className="text-[#26A4FF]">jobs</span>
                </h1>
                <div className="hidden lg:block">
                    <ShowAllJobsButton />
                </div>
            </div>

            <div className="hidden lg:grid mt-12 grid-cols-4 gap-8">
                {FeaturedJobsData.slice(0, 8).map((job) => (
                    <FeatureJobCard key={job.id} job={job} />
                ))}
            </div>

            {/* Mobile carousel - 1 card */}
            <div className="lg:hidden mt-6">
                <div className="overflow-hidden">
                    <FeatureJobCard job={FeaturedJobsData[currentIndex]} />
                </div>
                <div className="lg:hidden mt-5">
                    <ShowAllJobsButton />
                </div>
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full border border-[#D6DDEB] flex items-center justify-center text-[#4640DE] cursor-pointer"
                        aria-label="Previous job"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M10 12L6 8L10 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <span className="text-[14px] text-[#7C8493]">
                        {currentIndex + 1} / {FeaturedJobsData.length}
                    </span>

                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full border border-[#D6DDEB] flex items-center justify-center text-[#4640DE] cursor-pointer"
                        aria-label="Next job"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6 4L10 8L6 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
