"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import { LatestJobsData } from "@/content/landingPage/LatestJobs";
import type { LatestJobProps } from "@/content/landingPage/LatestJobs";
import { getCompanyLogo } from "@/lib/company-logos";
import { getLandingJobs } from "@/lib/job-cache";
import LatestJobCard from "./LatestJobCard";
import ShowAllJobsButton from "./ShowAllJobsButton";
import Link from "next/link";

function mapJobToLatestProps(job: Job): LatestJobProps {
    return {
        id: job.id,
        title: job.title,
        company: job.company,
        companyLogo: getCompanyLogo(job.company, job.company_logo),
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getLandingJobs();
                if (data.length > 0) {
                    const sorted = [...data].sort(
                        (a, b) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime(),
                    );
                    setJobs(sorted.slice(0, 8).map(mapJobToLatestProps));
                    setApiIds(sorted.slice(0, 8).map((j) => j.id));
                }
            } catch {
            } finally {
                setIsLoading(false);
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
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                          <div
                              key={i}
                              className="border border-[#D6DDEB] p-6 flex items-start gap-6 animate-pulse"
                          >
                              <div className="h-12 w-12 bg-gray-200 shrink-0" />
                              <div className="flex-1 space-y-2">
                                  <div className="h-5 w-3/4 bg-gray-200" />
                                  <div className="h-4 w-1/2 bg-gray-200" />
                                  <div className="flex gap-2 mt-2">
                                      <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                      <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                  </div>
                              </div>
                          </div>
                      ))
                    : jobs.slice(0, 8).map((job, idx) => (
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
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                              key={i}
                              className="border border-[#D6DDEB] p-6 flex items-start gap-4 animate-pulse"
                          >
                              <div className="h-12 w-12 bg-gray-200 shrink-0" />
                              <div className="flex-1 space-y-2">
                                  <div className="h-5 w-3/4 bg-gray-200" />
                                  <div className="h-4 w-1/2 bg-gray-200" />
                              </div>
                          </div>
                      ))
                    : jobs.slice(0, 6).map((job, idx) => (
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
