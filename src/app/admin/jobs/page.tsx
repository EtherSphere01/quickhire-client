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

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await jobApi.getAll();
            setJobs(res.data || []);
        } catch {
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, []);

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
            fetchJobs();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Failed to delete job",
            );
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#25324B]">
                    Manage Jobs
                </h1>
                <Link
                    href="/admin/jobs/create"
                    className="rounded-lg bg-[#4640DE] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3530c9] transition-colors"
                >
                    + Post New Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="rounded-xl border border-[#D6DDEB] bg-white py-16 text-center">
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
                <div className="rounded-xl border border-[#D6DDEB] bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-[#D6DDEB] text-[#7C8493]">
                                    <th className="p-4 font-medium">Job</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">
                                        Category
                                    </th>
                                    <th className="p-4 font-medium">
                                        Location
                                    </th>
                                    <th className="p-4 font-medium">Date</th>
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
                                                        className="rounded-lg object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F8FD] text-sm font-bold text-[#4640DE]">
                                                        {job.company[0]}
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
                                            <span className="rounded-full bg-[#56CDAD]/10 px-2.5 py-1 text-xs font-semibold text-[#56CDAD]">
                                                {JOB_TYPE_LABELS[job.job_type]}
                                            </span>
                                        </td>
                                        <td className="p-4 text-[#515B6F]">
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
                                                    className="rounded-lg border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#4640DE] hover:bg-[#4640DE]/5 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/jobs/${job.id}/applications`}
                                                    className="rounded-lg border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-[#26A4FF] hover:bg-[#26A4FF]/5 transition-colors"
                                                >
                                                    Applications
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        setDeleteId(job.id)
                                                    }
                                                    className="rounded-lg border border-[#D6DDEB] px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
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
            )}

            {/* Delete Confirmation */}
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
