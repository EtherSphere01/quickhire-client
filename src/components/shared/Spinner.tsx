interface SpinnerProps {
    className?: string;
}

/**
 * Reusable loading spinner component.
 */
export default function Spinner({ className = "" }: SpinnerProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
        </div>
    );
}
