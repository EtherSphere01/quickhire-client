"use client";

import { useEffect, useState } from "react";
import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import type { FeaturedJobProps } from "@/content/landingPage/FeaturedJobs";
import { FeaturedJobsData } from "@/content/landingPage/FeaturedJobs";
import { getCompanyLogo } from "@/lib/company-logos";
import FeatureJobCard from "./FeatureJobCard";
import ShowAllJobsButton from "./ShowAllJobsButton";
import Link from "next/link";

const CATEGORY_STYLES: Record<string, { color: string; bgColor: string }> = {
    Design: { color: "#FFB836", bgColor: "#EB85331A" },
    Marketing: { color: "#4640DE", bgColor: "#4640DE1A" },
    Technology: { color: "#56CDAD", bgColor: "#56CDAD1A" },
    Business: { color: "#26A4FF", bgColor: "#26A4FF1A" },
    Engineering: { color: "#4640DE", bgColor: "#4640DE1A" },
    Sales: { color: "#FFB836", bgColor: "#EB85331A" },
    Finance: { color: "#56CDAD", bgColor: "#56CDAD1A" },
    "Human Resource": { color: "#FF6550", bgColor: "#FF65501A" },
};

const BORDER_COLORS = [
    "#4640DE",
    "#56CDAD",
    "#26A4FF",
    "#FFB836",
    "#FF6550",
    "#4640DE",
    "#56CDAD",
    "#26A4FF",
];

function mapJobToFeaturedProps(job: Job, index: number): FeaturedJobProps {
    const catStyle = CATEGORY_STYLES[job.category] || {
        color: "#4640DE",
        bgColor: "#4640DE1A",
    };
    return {
        id: job.id,
        title: job.title,
        company: job.company,
        companyLogo:
            getCompanyLogo(job.company, job.company_logo) ||
            "/Images/companies/Revolut.svg",
        location: job.location,
        jobType: JOB_TYPE_LABELS[job.job_type],
        description:
            job.description.length > 100
                ? job.description.slice(0, 100) + "…"
                : job.description,
        categories: [
            { name: job.category, ...catStyle },
            {
                name: JOB_TYPE_LABELS[job.job_type],
                color: "#56CDAD",
                bgColor: "#56CDAD1A",
            },
        ],
        borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
    };
}

export default function FeaturedJobs() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [jobs, setJobs] = useState<FeaturedJobProps[]>(FeaturedJobsData);
    const [apiIds, setApiIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await jobApi.getAll({ limit: 8 });
                if (res.data && res.data.length > 0) {
                    setJobs(
                        res.data
                            .slice(0, 8)
                            .map((j, i) => mapJobToFeaturedProps(j, i)),
                    );
                    setApiIds(res.data.slice(0, 8).map((j) => j.id));
                }
            } catch {
                // Keep static data as fallback
            }
        };
        fetchJobs();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? jobs.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === jobs.length - 1 ? 0 : prev + 1));
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
                {jobs.slice(0, 8).map((job, idx) => (
                    <Link
                        key={job.id}
                        href={
                            apiIds[idx] ? `/job/${apiIds[idx]}` : "/find-jobs"
                        }
                        className="transition-transform hover:scale-[1.02]"
                    >
                        <FeatureJobCard job={job} />
                    </Link>
                ))}
            </div>

            {/* Mobile carousel - 1 card */}
            <div className="lg:hidden mt-6">
                <div className="overflow-hidden">
                    <Link
                        href={
                            apiIds[currentIndex]
                                ? `/job/${apiIds[currentIndex]}`
                                : "/find-jobs"
                        }
                    >
                        <FeatureJobCard job={jobs[currentIndex]} />
                    </Link>
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
                        {currentIndex + 1} / {jobs.length}
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
