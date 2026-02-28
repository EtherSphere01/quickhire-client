import { FeaturedJobProps } from "@/content/landingPage/FeaturedJobs";
import Image from "next/image";
import React from "react";

export default function FeatureJobCard({ job }: { job: FeaturedJobProps }) {
    return (
        <div className="border border-[#D6DDEB] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Image
                    src={job.companyLogo}
                    alt={job.company}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                />
                <span className="border border-[#4640DE] text-[#4640DE] text-[16px] font-normal px-3 py-1.5">
                    {job.jobType}
                </span>
            </div>

            <div>
                <h3 className="text-[18px] font-semibold text-[#25324B]">
                    {job.title}
                </h3>
                <p className="text-[16px] text-[#515B6F] mt-1">
                    {job.company} &bull; {job.location}
                </p>
            </div>

            <p className="text-[16px] text-[#7C8493] leading-[160%]">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {job.categories.map((cat) => (
                    <span
                        key={cat.name}
                        className="text-[14px] font-semibold rounded-full px-4 py-1"
                        style={{
                            color: cat.color,
                            backgroundColor: cat.bgColor,
                        }}
                    >
                        {cat.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
