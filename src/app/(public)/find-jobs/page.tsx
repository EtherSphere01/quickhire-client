"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { jobApi } from "@/api/jobs";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS, CATEGORY_OPTIONS } from "@/api/types";
import { getCompanyLogo } from "@/lib/company-logos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 9;

function FindJobsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [location, setLocation] = useState(
        searchParams.get("location") || "",
    );
    const [category, setCategory] = useState(
        searchParams.get("category") || "",
    );
    const [page, setPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await jobApi.getAll({
                search: search || undefined,
                location: location || undefined,
                category: category || undefined,
                page,
                limit: ITEMS_PER_PAGE,
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
    }, [search, location, category, page]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setLocation(searchParams.get("location") || "");
        setCategory(searchParams.get("category") || "");
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (location) params.set("location", location);
        if (category) params.set("category", category);
        router.push(`/find-jobs?${params.toString()}`);
        setPage(1);
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10 border border-[#D6DDEB] bg-white p-4 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                        placeholder="Job title or keyword"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1"
                    />
                    <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1"
                    />
                    <Select
                        value={category}
                        onValueChange={(val) => {
                            setCategory(val === "all" ? "" : val);
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {CATEGORY_OPTIONS.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleSearch}
                        className="bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                    >
                        Search
                    </Button>
                </div>
            </div>

            {loading ? (
                <>
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-4 w-20 animate-pulse bg-[#D6DDEB]/50" />
                        <div className="h-4 w-8 animate-pulse bg-[#D6DDEB]/50" />
                        <div className="h-4 w-12 animate-pulse bg-[#D6DDEB]/50" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="border border-[#D6DDEB] bg-white p-6 animate-pulse"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="h-12 w-12 bg-[#D6DDEB]/50 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-3/4 bg-[#D6DDEB]/50" />
                                        <div className="h-4 w-1/2 bg-[#D6DDEB]/50" />
                                    </div>
                                </div>
                                <div className="mb-4 space-y-2">
                                    <div className="h-4 w-full bg-[#D6DDEB]/50" />
                                    <div className="h-4 w-2/3 bg-[#D6DDEB]/50" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 rounded-full bg-[#D6DDEB]/50" />
                                    <div className="h-6 w-16 rounded-full bg-[#D6DDEB]/50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : jobs.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-lg text-[#7C8493]">
                        No jobs found. Try a different search.
                    </p>
                </div>
            ) : (
                <>
                    <p className="mb-6 text-sm text-[#7C8493]">
                        Showing{" "}
                        <span className="font-semibold text-[#25324B]">
                            {jobs.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-[#25324B]">
                            {totalJobs}
                        </span>{" "}
                        jobs
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <Link
                                key={job.id}
                                href={`/job/${job.id}`}
                                className="group border border-[#D6DDEB] bg-white p-6 transition-all hover:border-[#4640DE] hover:shadow-md"
                            >
                                <div className="mb-4 flex items-center gap-4">
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
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center bg-[#F8F8FD] text-lg font-bold text-[#4640DE]">
                                            {job.company
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-[#25324B] group-hover:text-[#4640DE] transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-[#7C8493]">
                                            {job.company} &bull; {job.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="mb-4 line-clamp-2 text-sm text-[#515B6F]">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-[#56CDAD]/10 px-3 py-1 text-xs font-semibold text-[#56CDAD]">
                                        {JOB_TYPE_LABELS[job.job_type]}
                                    </span>
                                    <span className="h-5 w-px bg-[#D6DDEB]" />
                                    <span className="rounded-full border border-[#4640DE] px-3 py-1 text-xs font-semibold text-[#4640DE]">
                                        {job.category}
                                    </span>
                                    {job.salary && (
                                        <>
                                            <span className="h-5 w-px bg-[#D6DDEB]" />
                                            <span className="rounded-full border border-[#FFB836] px-3 py-1 text-xs font-semibold text-[#FFB836]">
                                                ${job.salary.toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="cursor-pointer"
                            >
                                Previous
                            </Button>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1,
                            ).map((p) => (
                                <Button
                                    key={p}
                                    variant={p === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(p)}
                                    className={
                                        p === page
                                            ? "bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                                            : "cursor-pointer"
                                    }
                                >
                                    {p}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="cursor-pointer"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default function FindJobsPage() {
    return (
        <Suspense
            fallback={
                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 border border-[#D6DDEB] bg-white p-4 shadow-sm sm:p-6 animate-pulse">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="h-10 flex-1 bg-[#D6DDEB]/50" />
                            <div className="h-10 flex-1 bg-[#D6DDEB]/50" />
                            <div className="h-10 w-full sm:w-48 bg-[#D6DDEB]/50" />
                            <div className="h-10 w-full sm:w-24 bg-[#D6DDEB]/50" />
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="border border-[#D6DDEB] bg-white p-6 animate-pulse"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="h-12 w-12 bg-[#D6DDEB]/50 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-3/4 bg-[#D6DDEB]/50" />
                                        <div className="h-4 w-1/2 bg-[#D6DDEB]/50" />
                                    </div>
                                </div>
                                <div className="mb-4 space-y-2">
                                    <div className="h-4 w-full bg-[#D6DDEB]/50" />
                                    <div className="h-4 w-2/3 bg-[#D6DDEB]/50" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 rounded-full bg-[#D6DDEB]/50" />
                                    <div className="h-6 w-16 rounded-full bg-[#D6DDEB]/50" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            }
        >
            <FindJobsContent />
        </Suspense>
    );
}
