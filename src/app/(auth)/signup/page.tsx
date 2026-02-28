"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { signupSchema, type SignupValues } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Logo } from "@/svg/Logo";

export default function SignupPage() {
    const { register: registerUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: SignupValues) => {
        setLoading(true);
        try {
            await registerUser(values.name, values.email, values.password);
            toast.success("Account created! Please log in.");
            router.push("/login");
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Registration failed",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border border-[#D6DDEB] bg-white p-8 shadow-lg">
                <div className="mb-6 flex flex-col items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                        <span className="font-red-hat-display font-extrabold text-[24px]">
                            QuickHire
                        </span>
                    </Link>
                    <h1 className="font-(family-name:--font-clash-display) text-2xl font-semibold text-[#25324B]">
                        Create Account
                    </h1>
                    <p className="text-sm text-[#7C8493]">
                        Join QuickHire to find your dream job
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Full Name
                                    </FormLabel>
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
                                    <FormLabel className="text-[#515B6F]">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="••••••••"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#515B6F]">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="••••••••"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                        >
                            {loading ? "Creating account…" : "Sign Up"}
                        </Button>
                    </form>
                </Form>

                <p className="mt-5 text-center text-sm text-[#7C8493]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-[#4640DE] hover:underline"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
