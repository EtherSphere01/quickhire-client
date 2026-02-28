"use client";

import { useEffect, useState, useCallback } from "react";
import { jobApi } from "@/api/jobs";
import type { DashboardStats } from "@/api/jobs";
import { JOB_TYPE_LABELS } from "@/api/types";
import type { JobType } from "@/api/types";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
    PlusIcon,
    BriefcaseIcon,
    UsersIcon,
    LayersIcon,
    ChevronRightIcon,
    TrophyIcon,
    BuildingIcon,
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

function SkeletonPulse({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse bg-[#D6DDEB]/50 ${className}`} />;
}

function BannerSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-[#D6DDEB]/30 p-4 sm:p-5 flex items-center gap-3"
                >
                    <SkeletonPulse className="h-12 w-12 shrink-0" />
                    <div className="space-y-2 flex-1">
                        <SkeletonPulse className="h-7 w-16" />
                        <SkeletonPulse className="h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
            <SkeletonPulse className="h-5 w-36 mb-5" />
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                        <div className="flex justify-between mb-1">
                            <SkeletonPulse className="h-4 w-24" />
                            <SkeletonPulse className="h-4 w-8" />
                        </div>
                        <SkeletonPulse className="h-2 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TableSkeleton({ rows = 4 }: { rows?: number }) {
    return (
        <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
            <SkeletonPulse className="h-5 w-36 mb-4" />
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <SkeletonPulse className="h-4 w-1/4" />
                        <SkeletonPulse className="h-4 w-1/4" />
                        <SkeletonPulse className="h-4 w-1/4" />
                        <SkeletonPulse className="h-4 w-1/6" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const res = await jobApi.getStats();
            setStats(res.data || null);
        } catch {
            setStats(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalJobs = stats?.totalJobs ?? 0;
    const totalApplications = stats?.totalApplications ?? 0;
    const jobsByType = stats?.jobsByType ?? {};
    const jobsByCategory = stats?.jobsByCategory ?? {};
    const jobsByCompany = stats?.jobsByCompany ?? {};
    const topAppliedJob = stats?.topAppliedJob ?? null;
    const recentApplications = stats?.recentApplications ?? [];
    const recentJobs = stats?.recentJobs ?? [];

    const categoryEntries = Object.entries(jobsByCategory).sort(
        (a, b) => b[1] - a[1],
    );
    const companyEntries = Object.entries(jobsByCompany).sort(
        (a, b) => b[1] - a[1],
    );
    const typeEntries = Object.entries(jobsByType);
    const maxCategoryCount = categoryEntries.length
        ? Math.max(...categoryEntries.map(([, v]) => v))
        : 1;
    const maxCompanyCount = companyEntries.length
        ? Math.max(...companyEntries.map(([, v]) => v))
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

            {loading ? (
                <BannerSkeleton />
            ) : (
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
                                <p className="text-sm text-white/80">
                                    Jobs Open
                                </p>
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
                                <p className="text-sm text-white/80">
                                    Categories
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                    <div className="lg:col-span-3">
                        <ChartSkeleton />
                    </div>
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <ChartSkeleton />
                        <ChartSkeleton />
                    </div>
                </div>
            ) : (
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
                            <div className="flex items-center gap-2 mb-3">
                                <TrophyIcon className="h-5 w-5 text-[#FFB836]" />
                                <h2 className="text-base sm:text-lg font-semibold text-[#25324B]">
                                    Top Applied Job
                                </h2>
                            </div>
                            {topAppliedJob ? (
                                <div>
                                    <Link
                                        href={`/admin/jobs/${topAppliedJob.id}/edit`}
                                        className="text-base font-semibold text-[#25324B] hover:text-[#4640DE] transition-colors"
                                    >
                                        {topAppliedJob.title}
                                    </Link>
                                    <p className="text-sm text-[#7C8493] mt-0.5">
                                        {topAppliedJob.company}
                                    </p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="bg-[#4640DE]/10 px-3 py-1.5">
                                            <span className="text-2xl font-bold text-[#4640DE]">
                                                {topAppliedJob.applicationCount}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[#7C8493]">
                                            Applications
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-[#7C8493]">
                                    No applications yet
                                </p>
                            )}
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
                                                    type as JobType
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
            )}

            {loading ? (
                <ChartSkeleton />
            ) : (
                <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <BuildingIcon className="h-5 w-5 text-[#4640DE]" />
                        <h2 className="text-base sm:text-lg font-semibold text-[#25324B]">
                            Jobs by Company
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {companyEntries.map(([company, count]) => (
                            <div key={company}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[#515B6F]">
                                        {company}
                                    </span>
                                    <span className="text-sm font-semibold text-[#25324B]">
                                        {count} {count === 1 ? "job" : "jobs"}
                                    </span>
                                </div>
                                <div className="h-2 bg-[#F8F8FD] w-full">
                                    <div
                                        className="h-2 bg-[#26A4FF] transition-all duration-500"
                                        style={{
                                            width: `${(count / maxCompanyCount) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {companyEntries.length === 0 && (
                            <p className="text-sm text-[#7C8493]">
                                No companies yet
                            </p>
                        )}
                    </div>
                </div>
            )}

            {loading ? (
                <TableSkeleton rows={5} />
            ) : (
                <div className="border border-[#D6DDEB] bg-white p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-[#25324B] mb-4">
                        Recent Applicants
                    </h2>

                    {recentApplications.length === 0 ? (
                        <p className="text-sm text-[#7C8493] text-center py-6">
                            No applications received yet.
                        </p>
                    ) : (
                        <>
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-left text-sm min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                            <th className="pb-3 pr-4 font-medium">
                                                Name
                                            </th>
                                            <th className="pb-3 pr-4 font-medium">
                                                Email
                                            </th>
                                            <th className="pb-3 pr-4 font-medium">
                                                Applied For
                                            </th>
                                            <th className="pb-3 pr-4 font-medium">
                                                Company
                                            </th>
                                            <th className="pb-3 font-medium">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentApplications.map((app) => (
                                            <tr
                                                key={app.id}
                                                className="border-b border-[#D6DDEB] last:border-0"
                                            >
                                                <td className="py-3 pr-4 font-medium text-[#25324B]">
                                                    {app.name}
                                                </td>
                                                <td className="py-3 pr-4 text-[#515B6F]">
                                                    <a
                                                        href={`mailto:${app.email}`}
                                                        className="hover:text-[#4640DE] transition-colors"
                                                    >
                                                        {app.email}
                                                    </a>
                                                </td>
                                                <td className="py-3 pr-4 text-[#25324B]">
                                                    {app.job.title}
                                                </td>
                                                <td className="py-3 pr-4 text-[#515B6F]">
                                                    {app.job.company}
                                                </td>
                                                <td className="py-3 text-[#7C8493]">
                                                    {new Date(
                                                        app.created_at,
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="sm:hidden space-y-3">
                                {recentApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="border-b border-[#D6DDEB] pb-3 last:border-0 last:pb-0"
                                    >
                                        <p className="font-medium text-[#25324B] text-sm">
                                            {app.name}
                                        </p>
                                        <a
                                            href={`mailto:${app.email}`}
                                            className="text-xs text-[#515B6F] hover:text-[#4640DE] transition-colors"
                                        >
                                            {app.email}
                                        </a>
                                        <p className="text-xs text-[#25324B] mt-1">
                                            Applied for{" "}
                                            <span className="font-medium">
                                                {app.job.title}
                                            </span>{" "}
                                            at {app.job.company}
                                        </p>
                                        <p className="text-xs text-[#7C8493] mt-0.5">
                                            {new Date(
                                                app.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {loading ? (
                <TableSkeleton rows={5} />
            ) : (
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

                    {recentJobs.length === 0 ? (
                        <p className="text-sm text-[#7C8493] text-center py-8">
                            No jobs posted yet.{" "}
                            <Link
                                href="/admin/jobs/create"
                                className="text-[#4640DE] hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    ) : (
                        <>
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                            <th className="pb-3 pr-4 font-medium">
                                                Title
                                            </th>
                                            <th className="pb-3 pr-4 font-medium">
                                                Company
                                            </th>
                                            <th className="pb-3 pr-4 font-medium">
                                                Type
                                            </th>
                                            <th className="pb-3 font-medium">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentJobs.map((job) => (
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
                                                        {JOB_TYPE_LABELS[
                                                            job.job_type as JobType
                                                        ] ||
                                                            job.job_type.replace(
                                                                "_",
                                                                " ",
                                                            )}
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
                                {recentJobs.map((job) => (
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
                                                {JOB_TYPE_LABELS[
                                                    job.job_type as JobType
                                                ] ||
                                                    job.job_type.replace(
                                                        "_",
                                                        " ",
                                                    )}
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
