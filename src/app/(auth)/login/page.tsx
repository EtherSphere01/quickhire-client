"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, type LoginValues } from "@/lib/schemas/auth.schema";
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

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: LoginValues) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
            toast.success("Logged in successfully!");
            router.push("/");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDemoAdmin = async () => {
        setLoading(true);
        try {
            await login("admin@gmail.com", "123456");
            toast.success("Logged in as Admin!");
            router.push("/admin");
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Demo login failed",
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
                        Welcome Back
                    </h1>
                    <p className="text-sm text-[#7C8493]">
                        Log in to your QuickHire account
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#4640DE] hover:bg-[#3530c9] cursor-pointer"
                        >
                            {loading ? "Logging in…" : "Log In"}
                        </Button>
                    </form>
                </Form>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#D6DDEB]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-[#7C8493]">or</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handleDemoAdmin}
                    disabled={loading}
                    className="w-full border-[#4640DE] text-[#4640DE] hover:bg-[#4640DE]/5 cursor-pointer"
                >
                    Demo Admin Login
                </Button>

                <p className="mt-5 text-center text-sm text-[#7C8493]">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#4640DE] hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
