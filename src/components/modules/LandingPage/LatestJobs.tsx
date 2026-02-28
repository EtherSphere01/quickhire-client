"use client";

import { useEffect, useState } from "react";
import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import { LatestJobsData } from "@/content/landingPage/LatestJobs";
import type { LatestJobProps } from "@/content/landingPage/LatestJobs";
import LatestJobCard from "./LatestJobCard";
import ShowAllJobsButton from "./ShowAllJobsButton";
import Link from "next/link";

function mapJobToLatestProps(job: Job): LatestJobProps {
    return {
        id: job.id,
        title: job.title,
        company: job.company,
        companyLogo: job.company_logo || "/Images/companies/fallback.png",
        location: job.location,
        tags: [
            {
                name: JOB_TYPE_LABELS[job.job_type],
                color: "#56CDAD",
                borderColor: "#56CDAD1A",
            },
            {
                name: job.category,
                color: "#4640DE",
                borderColor: "#4640DE",
            },
            ...(job.salary
                ? [
                      {
                          name: `$${job.salary.toLocaleString()}`,
                          color: "#FFB836",
                          borderColor: "#FFB836",
                      },
                  ]
                : []),
        ],
    };
}

export default function LatestJobs() {
    const [jobs, setJobs] = useState<LatestJobProps[]>(LatestJobsData);
    const [apiIds, setApiIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await jobApi.getAll();
                if (res.data && res.data.length > 0) {
                    // Take the latest 8 (sorted by newest first)
                    const sorted = [...res.data].sort(
                        (a, b) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime()
                    );
                    setJobs(sorted.slice(0, 8).map(mapJobToLatestProps));
                    setApiIds(sorted.slice(0, 8).map((j) => j.id));
                }
            } catch {
                // Keep static data as fallback
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end">
                <h1 className="text-[32px] md:text-[48px] font-semibold">
                    Latest <span className="text-[#26A4FF]">jobs open</span>
                </h1>
                <div className="hidden lg:block">
                    <ShowAllJobsButton />
                </div>
            </div>

            <div className="hidden lg:grid my-12 grid-cols-2 gap-x-8 gap-y-4">
                {jobs.slice(0, 8).map((job, idx) => (
                    <Link
                        key={job.id}
                        href={
                            apiIds[idx]
                                ? `/job/${apiIds[idx]}`
                                : "/find-jobs"
                        }
                        className="transition-transform hover:scale-[1.01]"
                    >
                        <LatestJobCard job={job} />
                    </Link>
                ))}
            </div>

            <div className="lg:hidden mt-6 flex flex-col gap-4">
                {jobs.slice(0, 6).map((job, idx) => (
                    <Link
                        key={job.id}
                        href={
                            apiIds[idx]
                                ? `/job/${apiIds[idx]}`
                                : "/find-jobs"
                        }
                    >
                        <LatestJobCard job={job} />
                    </Link>
                ))}
            </div>

            <div className="lg:hidden mt-5">
                <ShowAllJobsButton />
            </div>
        </div>
    );
}
