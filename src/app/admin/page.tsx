"use client";

import { useEffect, useState } from "react";
import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function AdminDashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await jobApi.getAll();
                setJobs(res.data || []);
            } catch {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const stats = [
        { label: "Total Jobs", value: jobs.length, color: "bg-[#4640DE]" },
        {
            label: "Full-Time",
            value: jobs.filter((j) => j.job_type === "FULL_TIME").length,
            color: "bg-[#56CDAD]",
        },
        {
            label: "Part-Time",
            value: jobs.filter((j) => j.job_type === "PART_TIME").length,
            color: "bg-[#26A4FF]",
        },
        {
            label: "Contract",
            value: jobs.filter((j) => j.job_type === "CONTRACT").length,
            color: "bg-[#FFB836]",
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-[#25324B]">
                    Dashboard
                </h1>
                <Link
                    href="/admin/jobs/create"
                    className="bg-[#4640DE] px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white hover:bg-[#3530c9] transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                    <PlusIcon className="mr-1 h-4 w-4" />
                    Post New Job
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="border border-[#D6DDEB] bg-white p-4 sm:p-6"
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${stat.color}`}
                            />
                            <p className="text-xs sm:text-sm text-[#7C8493]">
                                {stat.label}
                            </p>
                        </div>
                        <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#25324B]">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                <h2 className="mb-4 text-base sm:text-lg font-semibold text-[#25324B]">
                    Recent Jobs
                </h2>

                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                <th className="pb-3 pr-4 font-medium">Title</th>
                                <th className="pb-3 pr-4 font-medium">
                                    Company
                                </th>
                                <th className="pb-3 pr-4 font-medium">Type</th>
                                <th className="pb-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.slice(0, 5).map((job) => (
                                <tr
                                    key={job.id}
                                    className="border-b border-[#D6DDEB] last:border-0"
                                >
                                    <td className="py-3 pr-4 font-medium text-[#25324B]">
                                        {job.title}
                                    </td>
                                    <td className="py-3 pr-4 text-[#515B6F]">
                                        {job.company}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="rounded-full bg-[#56CDAD]/10 px-2 py-1 text-xs font-semibold text-[#56CDAD]">
                                            {job.job_type.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="py-3 text-[#7C8493]">
                                        {new Date(
                                            job.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sm:hidden space-y-3">
                    {jobs.slice(0, 5).map((job) => (
                        <div
                            key={job.id}
                            className="border-b border-[#D6DDEB] pb-3 last:border-0 last:pb-0"
                        >
                            <p className="font-medium text-[#25324B] text-sm">
                                {job.title}
                            </p>
                            <p className="text-xs text-[#515B6F] mt-0.5">
                                {job.company}
                            </p>
                            <div className="flex items-center justify-between mt-1.5">
                                <span className="rounded-full bg-[#56CDAD]/10 px-2 py-0.5 text-xs font-semibold text-[#56CDAD]">
                                    {job.job_type.replace("_", " ")}
                                </span>
                                <span className="text-xs text-[#7C8493]">
                                    {new Date(
                                        job.created_at,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
