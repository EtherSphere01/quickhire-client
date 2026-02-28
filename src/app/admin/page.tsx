"use client";

import { useEffect, useState } from "react";
import { jobApi } from "@/api/jobs";
import type { DashboardStats } from "@/api/jobs";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
    PlusIcon,
    BriefcaseIcon,
    UsersIcon,
    LayersIcon,
    ChevronRightIcon,
} from "lucide-react";

const JOB_TYPE_COLORS: Record<string, string> = {
    FULL_TIME: "#4640DE",
    PART_TIME: "#26A4FF",
    CONTRACT: "#FFB836",
    INTERNSHIP: "#56CDAD",
    FREELANCE: "#FF6550",
};

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, jobsRes] = await Promise.all([
                    jobApi.getStats(),
                    jobApi.getAll(),
                ]);
                setStats(statsRes.data || null);
                setJobs(jobsRes.data || []);
            } catch {
                setStats(null);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
            </div>
        );
    }

    const totalJobs = stats?.totalJobs ?? jobs.length;
    const totalApplications = stats?.totalApplications ?? 0;
    const jobsByType = stats?.jobsByType ?? {};
    const jobsByCategory = stats?.jobsByCategory ?? {};
    const categoryEntries = Object.entries(jobsByCategory).sort(
        (a, b) => b[1] - a[1],
    );
    const typeEntries = Object.entries(jobsByType);
    const maxCategoryCount = categoryEntries.length
        ? Math.max(...categoryEntries.map(([, v]) => v))
        : 1;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#25324B]">
                        {getGreeting()}, {user?.name?.split(" ")[0] || "Admin"}
                    </h1>
                    <p className="text-sm text-[#7C8493] mt-0.5">
                        Here is your job listings overview
                    </p>
                </div>
                <Link
                    href="/admin/jobs/create"
                    className="bg-[#4640DE] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3530c9] transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto"
                >
                    <PlusIcon className="h-4 w-4" />
                    Post a Job
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Link
                    href="/admin/jobs"
                    className="bg-[#56CDAD] p-4 sm:p-5 flex items-center justify-between group transition-colors hover:bg-[#49b89a]"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white/20 flex items-center justify-center">
                            <BriefcaseIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                {totalJobs}
                            </p>
                            <p className="text-sm text-white/80">Jobs Open</p>
                        </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                </Link>

                <div className="bg-[#26A4FF] p-4 sm:p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white/20 flex items-center justify-center">
                            <UsersIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                {totalApplications}
                            </p>
                            <p className="text-sm text-white/80">
                                Applications
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#7B61FF] p-4 sm:p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white/20 flex items-center justify-center">
                            <LayersIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                {categoryEntries.length}
                            </p>
                            <p className="text-sm text-white/80">Categories</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                <div className="lg:col-span-3 border border-[#D6DDEB] bg-white p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-[#25324B] mb-5">
                        Jobs by Category
                    </h2>
                    <div className="space-y-3">
                        {categoryEntries.map(([category, count]) => (
                            <div key={category}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[#515B6F]">
                                        {category}
                                    </span>
                                    <span className="text-sm font-semibold text-[#25324B]">
                                        {count}
                                    </span>
                                </div>
                                <div className="h-2 bg-[#F8F8FD] w-full">
                                    <div
                                        className="h-2 bg-[#4640DE] transition-all duration-500"
                                        style={{
                                            width: `${(count / maxCategoryCount) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {categoryEntries.length === 0 && (
                            <p className="text-sm text-[#7C8493]">
                                No jobs posted yet
                            </p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                        <h2 className="text-base sm:text-lg font-semibold text-[#25324B] mb-1">
                            Jobs Open
                        </h2>
                        <p className="text-4xl sm:text-5xl font-bold text-[#25324B] mt-2">
                            {totalJobs}
                        </p>
                        <p className="text-sm text-[#7C8493] mt-1">
                            Jobs Opened
                        </p>
                    </div>

                    <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                        <h2 className="text-base sm:text-lg font-semibold text-[#25324B] mb-1">
                            Job Type Summary
                        </h2>
                        <p className="text-3xl sm:text-4xl font-bold text-[#25324B] mt-2">
                            {totalJobs}
                        </p>
                        <p className="text-sm text-[#7C8493] mb-4">
                            Total Jobs
                        </p>
                        <div className="space-y-2.5">
                            {typeEntries.map(([type, count]) => (
                                <div
                                    key={type}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    JOB_TYPE_COLORS[type] ||
                                                    "#7C8493",
                                            }}
                                        />
                                        <span className="text-sm text-[#515B6F]">
                                            {JOB_TYPE_LABELS[
                                                type as keyof typeof JOB_TYPE_LABELS
                                            ] || type}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-[#25324B]">
                                        {count}
                                    </span>
                                </div>
                            ))}
                            {typeEntries.length === 0 && (
                                <p className="text-sm text-[#7C8493]">
                                    No data
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-[#25324B]">
                        Recent Jobs
                    </h2>
                    <Link
                        href="/admin/jobs"
                        className="text-sm text-[#4640DE] hover:underline"
                    >
                        View All
                    </Link>
                </div>

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
                                        <Link
                                            href={`/admin/jobs/${job.id}/edit`}
                                            className="hover:text-[#4640DE] transition-colors"
                                        >
                                            {job.title}
                                        </Link>
                                    </td>
                                    <td className="py-3 pr-4 text-[#515B6F]">
                                        {job.company}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="whitespace-nowrap rounded-full bg-[#56CDAD]/10 px-2 py-1 text-xs font-semibold text-[#56CDAD]">
                                            {JOB_TYPE_LABELS[job.job_type] ||
                                                job.job_type.replace("_", " ")}
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
                            <Link
                                href={`/admin/jobs/${job.id}/edit`}
                                className="font-medium text-[#25324B] text-sm hover:text-[#4640DE] transition-colors"
                            >
                                {job.title}
                            </Link>
                            <p className="text-xs text-[#515B6F] mt-0.5">
                                {job.company}
                            </p>
                            <div className="flex items-center justify-between mt-1.5">
                                <span className="whitespace-nowrap rounded-full bg-[#56CDAD]/10 px-2 py-0.5 text-xs font-semibold text-[#56CDAD]">
                                    {JOB_TYPE_LABELS[job.job_type] ||
                                        job.job_type.replace("_", " ")}
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

                {jobs.length === 0 && (
                    <p className="text-sm text-[#7C8493] text-center py-8">
                        No jobs posted yet.{" "}
                        <Link
                            href="/admin/jobs/create"
                            className="text-[#4640DE] hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
