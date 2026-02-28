export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8F8FD]">
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
                <div className="relative h-14 w-14">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#D6DDEB] border-t-[#4640DE]" />
                </div>
                <p className="text-sm font-medium text-[#7C8493] animate-pulse">
                    Loading…
                </p>
            </div>
        </div>
    );
}
