"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { jobApi } from "@/api/jobs";
import { CATEGORY_OPTIONS } from "@/api/types";
import { jobSchema, type JobFormValues } from "@/lib/schemas/job.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function CreateJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            category: "",
            job_type: "FULL_TIME",
            salary: "",
            description: "",
        },
    });

    const onSubmit = async (values: JobFormValues) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("company", values.company);
            formData.append("location", values.location);
            formData.append("category", values.category);
            formData.append("job_type", values.job_type);
            if (values.salary) formData.append("salary", values.salary);
            formData.append("description", values.description);
            if (logoFile) formData.append("company_logo", logoFile);

            await jobApi.create(formData);
            toast.success("Job created successfully!");
            router.push("/admin/jobs");
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Failed to create job",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="mb-8 text-2xl font-bold text-[#25324B]">
                Post New Job
            </h1>

            <div className="border border-[#D6DDEB] bg-white p-6 sm:p-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Job Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Senior UI Designer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#515B6F]">
                                            Company
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Nomad"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#515B6F]">
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. San Francisco, CA"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#515B6F]">
                                            Category
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CATEGORY_OPTIONS.map((cat) => (
                                                    <SelectItem
                                                        key={cat}
                                                        value={cat}
                                                    >
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="job_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#515B6F]">
                                            Job Type
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FULL_TIME">
                                                    Full Time
                                                </SelectItem>
                                                <SelectItem value="PART_TIME">
                                                    Part Time
                                                </SelectItem>
                                                <SelectItem value="CONTRACT">
                                                    Contract
                                                </SelectItem>
                                                <SelectItem value="INTERNSHIP">
                                                    Internship
                                                </SelectItem>
                                                <SelectItem value="FREELANCE">
                                                    Freelance
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Salary (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 80000"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#515B6F]">
                                Company Logo (optional)
                            </label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setLogoFile(e.target.files?.[0] || null)
                                }
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Job Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the role, responsibilities, and requirements…"
                                            rows={8}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                            >
                                {loading ? "Creating…" : "Post Job"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/jobs")}
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
