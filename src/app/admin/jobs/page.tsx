"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import { getCompanyLogo } from "@/lib/company-logos";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const JOBS_PER_PAGE = 10;

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await jobApi.getAll({
                page: currentPage,
                limit: JOBS_PER_PAGE,
            });
            setJobs(res.data || []);
            if (res.meta) {
                setTotalJobs(res.meta.total);
                setTotalPages(res.meta.totalPages);
            }
        } catch {
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await jobApi.delete(deleteId);
            toast.success("Job deleted successfully");
            setDeleteId(null);
            if (jobs.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchJobs();
            }
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Failed to delete job",
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-[#25324B]">
                    Manage Jobs
                </h1>
                <Link
                    href="/admin/jobs/create"
                    className="bg-[#4640DE] px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white hover:bg-[#3530c9] transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                    <PlusIcon className="mr-1 h-4 w-4" /> Post New Job
                </Link>
            </div>

            {loading ? (
                <>
                    <div className="hidden md:block border border-[#D6DDEB] bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                        <th className="p-4 font-medium">Job</th>
                                        <th className="p-4 font-medium">
                                            Type
                                        </th>
                                        <th className="p-4 font-medium hidden lg:table-cell">
                                            Category
                                        </th>
                                        <th className="p-4 font-medium">
                                            Location
                                        </th>
                                        <th className="p-4 font-medium">
                                            Date
                                        </th>
                                        <th className="p-4 font-medium text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-[#D6DDEB] last:border-0 animate-pulse"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 bg-[#D6DDEB]/50 shrink-0" />
                                                    <div className="space-y-1.5">
                                                        <div className="h-4 w-32 bg-[#D6DDEB]/50" />
                                                        <div className="h-3 w-20 bg-[#D6DDEB]/50" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-6 w-20 rounded-full bg-[#D6DDEB]/50" />
                                            </td>
                                            <td className="p-4 hidden lg:table-cell">
                                                <div className="h-4 w-20 bg-[#D6DDEB]/50" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-24 bg-[#D6DDEB]/50" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-20 bg-[#D6DDEB]/50" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end gap-2">
                                                    <div className="h-7 w-12 bg-[#D6DDEB]/50" />
                                                    <div className="h-7 w-20 bg-[#D6DDEB]/50" />
                                                    <div className="h-7 w-14 bg-[#D6DDEB]/50" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:hidden space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="border border-[#D6DDEB] bg-white p-4 animate-pulse"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 bg-[#D6DDEB]/50 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-[#D6DDEB]/50" />
                                        <div className="h-3 w-1/2 bg-[#D6DDEB]/50" />
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <div className="h-6 w-16 rounded-full bg-[#D6DDEB]/50" />
                                    <div className="h-4 w-20 bg-[#D6DDEB]/50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : jobs.length === 0 ? (
                <div className="border border-[#D6DDEB] bg-white py-16 text-center">
                    <p className="text-lg text-[#7C8493]">
                        No jobs posted yet.{" "}
                        <Link
                            href="/admin/jobs/create"
                            className="text-[#4640DE] hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            ) : (
                <>
                    <div className="hidden md:block border border-[#D6DDEB] bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm min-w-[600px] lg:min-w-0">
                                <thead>
                                    <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                        <th className="p-4 font-medium">Job</th>
                                        <th className="p-4 font-medium whitespace-nowrap">
                                            Type
                                        </th>
                                        <th className="p-4 font-medium hidden lg:table-cell">
                                            Category
                                        </th>
                                        <th className="p-4 font-medium">
                                            Location
                                        </th>
                                        <th className="p-4 font-medium">
                                            Date
                                        </th>
                                        <th className="p-4 font-medium text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr
                                            key={job.id}
                                            className="border-b border-[#D6DDEB] last:border-0 hover:bg-[#F8F8FD] transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {getCompanyLogo(
                                                        job.company,
                                                        job.company_logo,
                                                    ) ? (
                                                        <Image
                                                            src={
                                                                getCompanyLogo(
                                                                    job.company,
                                                                    job.company_logo,
                                                                )!
                                                            }
                                                            alt={job.company}
                                                            width={36}
                                                            height={36}
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <div className="flex h-9 w-9 items-center justify-center bg-[#F8F8FD] text-sm font-bold text-[#4640DE]">
                                                            {job.company
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-[#25324B]">
                                                            {job.title}
                                                        </p>
                                                        <p className="text-xs text-[#7C8493]">
                                                            {job.company}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="whitespace-nowrap rounded-full bg-[#56CDAD]/10 px-2.5 py-1 text-xs font-semibold text-[#56CDAD]">
                                                    {
                                                        JOB_TYPE_LABELS[
                                                            job.job_type
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="p-4 text-[#515B6F] hidden lg:table-cell">
                                                {job.category}
                                            </td>
                                            <td className="p-4 text-[#515B6F]">
                                                {job.location}
                                            </td>
                                            <td className="p-4 text-[#7C8493]">
                                                {new Date(
                                                    job.created_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/jobs/${job.id}/edit`}
                                                        className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#4640DE] hover:bg-[#4640DE]/5 transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/admin/jobs/${job.id}/applications`}
                                                        className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#26A4FF] hover:bg-[#26A4FF]/5 transition-colors"
                                                    >
                                                        Applications
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteId(job.id)
                                                        }
                                                        className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="md:hidden space-y-3">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="border border-[#D6DDEB] bg-white p-4"
                            >
                                <div className="flex items-start gap-3">
                                    {getCompanyLogo(
                                        job.company,
                                        job.company_logo,
                                    ) ? (
                                        <Image
                                            src={
                                                getCompanyLogo(
                                                    job.company,
                                                    job.company_logo,
                                                )!
                                            }
                                            alt={job.company}
                                            width={40}
                                            height={40}
                                            className="object-contain shrink-0"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F8F8FD] text-sm font-bold text-[#4640DE]">
                                            {job.company
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-[#25324B] truncate">
                                            {job.title}
                                        </p>
                                        <p className="text-xs text-[#7C8493]">
                                            {job.company}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                                    <span className="rounded-full bg-[#56CDAD]/10 px-2.5 py-1 font-semibold text-[#56CDAD]">
                                        {JOB_TYPE_LABELS[job.job_type]}
                                    </span>
                                    <span className="text-[#515B6F]">
                                        {job.category}
                                    </span>
                                    <span className="text-[#7C8493]">
                                        {job.location}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-[#7C8493]">
                                        {new Date(
                                            job.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/jobs/${job.id}/edit`}
                                            className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#4640DE] hover:bg-[#4640DE]/5 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/admin/jobs/${job.id}/applications`}
                                            className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#26A4FF] hover:bg-[#26A4FF]/5 transition-colors"
                                        >
                                            Apps
                                        </Link>
                                        <button
                                            onClick={() => setDeleteId(job.id)}
                                            className="border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border border-[#D6DDEB] bg-white px-4 py-3">
                            <p className="text-sm text-[#7C8493]">
                                Showing {(currentPage - 1) * JOBS_PER_PAGE + 1}–
                                {Math.min(
                                    currentPage * JOBS_PER_PAGE,
                                    totalJobs,
                                )}{" "}
                                of {totalJobs} jobs
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="p-2 text-[#7C8493] hover:text-[#25324B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </button>
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`h-8 w-8 text-sm font-medium transition-colors cursor-pointer ${
                                            currentPage === page
                                                ? "bg-[#4640DE] text-white"
                                                : "text-[#7C8493] hover:bg-[#F8F8FD]"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(totalPages, p + 1),
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-2 text-[#7C8493] hover:text-[#25324B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRightIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Job</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-[#515B6F]">
                        Are you sure you want to delete this job? This action
                        cannot be undone.
                    </p>
                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                        >
                            {deleting ? "Deleting…" : "Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
