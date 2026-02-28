"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { jobApi } from "@/api/jobs";
import { applicationApi } from "@/api/applications";
import type { Job } from "@/api/types";
import { JOB_TYPE_LABELS } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const applySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    resume_link: z.string().url("Enter a valid URL for your resume"),
    cover_note: z.string().min(10, "Cover note must be at least 10 characters"),
});

type ApplyValues = z.infer<typeof applySchema>;

export default function JobDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<ApplyValues>({
        resolver: zodResolver(applySchema),
        defaultValues: { name: "", email: "", resume_link: "", cover_note: "" },
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await jobApi.getById(Number(id));
                if (res.data) setJob(res.data);
                else router.push("/404");
            } catch {
                router.push("/404");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, router]);

    const onApply = async (values: ApplyValues) => {
        setApplying(true);
        try {
            await applicationApi.apply({ ...values, job_id: Number(id) });
            toast.success("Application submitted successfully!");
            setDialogOpen(false);
            form.reset();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Failed to submit application"
            );
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
            </div>
        );
    }

    if (!job) return null;

    return (
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
                href="/find-jobs"
                className="mb-6 inline-flex items-center gap-1 text-sm text-[#7C8493] hover:text-[#4640DE] transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back to Jobs
            </Link>

            {/* Header Card */}
            <div className="rounded-xl border border-[#D6DDEB] bg-white p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-5">
                        {job.company_logo ? (
                            <Image
                                src={job.company_logo}
                                alt={job.company}
                                width={64}
                                height={64}
                                className="rounded-xl object-contain"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#F8F8FD] text-2xl font-bold text-[#4640DE]">
                                {job.company[0]}
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-[#25324B]">
                                {job.title}
                            </h1>
                            <p className="mt-1 text-[#7C8493]">
                                {job.company} &bull; {job.location}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
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
                        </div>
                    </div>

                    {/* Apply Now */}
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#4640DE] hover:bg-[#3530c9] px-8 cursor-pointer">
                                Apply Now
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    Apply for {job.title}
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onApply)}
                                    className="space-y-4 mt-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="resume_link"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Resume Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://drive.google.com/..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cover_note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cover Note</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us why you're a great fit…"
                                                        rows={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={applying}
                                        className="w-full bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                                    >
                                        {applying
                                            ? "Submitting…"
                                            : "Submit Application"}
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Description */}
            <div className="mt-8 rounded-xl border border-[#D6DDEB] bg-white p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <h2 className="mb-4 text-xl font-semibold text-[#25324B]">
                    Job Description
                </h2>
                <div className="prose max-w-none text-[#515B6F] whitespace-pre-line leading-relaxed">
                    {job.description}
                </div>
            </div>

            {/* Posted date */}
            <p className="mt-6 text-center text-sm text-[#7C8493]">
                Posted on{" "}
                {new Date(job.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </section>
    );
}
