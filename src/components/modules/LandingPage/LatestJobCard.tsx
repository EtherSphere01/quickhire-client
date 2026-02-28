import { LatestJobProps } from "@/content/landingPage/LatestJobs";
import Image from "next/image";
import React from "react";

export default function LatestJobCard({ job }: { job: LatestJobProps }) {
    return (
        <div className="flex items-start gap-4 p-4 lg:py-6 lg:px-10 bg-white">
            {job.companyLogo ? (
                <Image
                    src={job.companyLogo}
                    alt={job.company}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain shrink-0"
                />
            ) : (
                <div className="h-12 w-12 flex items-center justify-center bg-[#F8F8FD] text-xl font-bold text-[#4640DE] shrink-0">
                    {job.company.charAt(0).toUpperCase()}
                </div>
            )}
            <div>
                <h3 className="text-[20px] font-semibold text-[#25324B]">
                    {job.title}
                </h3>
                <p className="text-[16px] text-[#515B6F] mt-1">
                    {job.company} &bull; {job.location}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    {job.tags.map((tag, index) => (
                        <React.Fragment key={tag.name}>
                            {tag.name === "Full-Time" &&
                                index < job.tags.length - 1 && (
                                    <>
                                        <span
                                            className="text-[14px] font-semibold rounded-full px-3 py-1.5"
                                            style={{
                                                color: tag.color,
                                                backgroundColor:
                                                    tag.borderColor,
                                            }}
                                        >
                                            {tag.name}
                                        </span>
                                        <span className="h-7 w-px bg-[#D6DDEB] mx-1"></span>
                                    </>
                                )}
                            {tag.name !== "Full-Time" && (
                                <span
                                    className="text-[14px] font-semibold rounded-full px-3 py-1.5 border"
                                    style={{
                                        color: tag.color,
                                        borderColor: tag.borderColor,
                                    }}
                                >
                                    {tag.name}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
