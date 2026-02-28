import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "@/svg/LandingPage/RightArrowIcon";
import Link from "next/link";

export default function ShowAllJobsButton() {
    return (
        <Link href="/find-jobs">
            <Button
                variant={"secondary"}
                className="bg-transparent text-[#4640DE] text-[16px] flex items-center gap-4 font-semibold cursor-pointer"
            >
                Show all jobs
                <RightArrowIcon />
            </Button>
        </Link>
    );
}
