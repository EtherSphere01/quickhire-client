import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-[#F8F8FD] to-white px-4 text-center">
            <div className="animate-in fade-in zoom-in duration-500">
                <h1 className="bg-linear-to-r from-[#4640DE] to-[#26A4FF] bg-clip-text text-[120px] font-bold leading-none text-transparent sm:text-[180px]">
                    404
                </h1>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <h2 className="mt-4 text-2xl font-semibold text-[#25324B] sm:text-3xl">
                    Page Not Found
                </h2>
                <p className="mt-3 max-w-md text-[#7C8493]">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or
                    has been moved.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="bg-[#4640DE] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#3530c9]"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/find-jobs"
                        className="border border-[#4640DE] px-8 py-3 font-semibold text-[#4640DE] transition-colors hover:bg-[#4640DE]/5"
                    >
                        Find Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
}
