"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { applicationApi } from "@/api/applications";
import type { Application } from "@/api/types";

export default function ApplicationsPage() {
    const { id } = useParams<{ id: string }>();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await applicationApi.getByJobId(Number(id));
                setApplications(res.data || []);
            } catch {
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

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
                    Applications
                </h1>
                <Link
                    href="/admin/jobs"
                    className="text-sm text-[#4640DE] hover:underline"
                >
                    &larr; Back to Jobs
                </Link>
            </div>

            {applications.length === 0 ? (
                <div className="border border-[#D6DDEB] bg-white py-16 text-center">
                    <p className="text-lg text-[#7C8493]">
                        No applications received yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="border border-[#D6DDEB] bg-white p-6"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-[#25324B]">
                                        {app.name}
                                    </h3>
                                    <p className="text-sm text-[#7C8493]">
                                        {app.email}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={app.resume_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#4640DE] px-4 py-2 text-xs font-medium text-white hover:bg-[#3530c9] transition-colors"
                                    >
                                        View Resume
                                    </a>
                                    <span className="text-xs text-[#7C8493]">
                                        {new Date(
                                            app.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-[#515B6F] leading-relaxed">
                                {app.cover_note}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
