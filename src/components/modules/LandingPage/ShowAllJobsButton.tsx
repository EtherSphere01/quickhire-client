import { Button } from "@/components/ui/button";
import { RightArrowIcon } from "@/svg/LandingPage/RightArrowIcon";
import React from "react";

export default function ShowAllJobsButton() {
    return (
        <div>
            <Button
                variant={"secondary"}
                className="bg-transparent text-[#4640DE] text-[16px] flex items-center gap-4 font-semibold"
            >
                Show all jobs
                <RightArrowIcon />
            </Button>
        </div>
    );
}
