import { LatestJobsData } from "@/content/landingPage/LatestJobs";
import React from "react";
import LatestJobCard from "./LatestJobCard";
import ShowAllJobsButton from "./ShowAllJobsButton";

export default function LatestJobs() {
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
                {LatestJobsData.slice(0, 8).map((job) => (
                    <LatestJobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="lg:hidden mt-6 flex flex-col gap-4">
                {LatestJobsData.slice(0, 6).map((job) => (
                    <LatestJobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="lg:hidden mt-5">
                <ShowAllJobsButton />
            </div>
        </div>
    );
}
