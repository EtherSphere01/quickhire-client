import { Button } from "@/components/ui/button";
import { DownArrowIcon } from "@/svg/LandingPage/DownArrowIcon";
import { LocationIcon } from "@/svg/LandingPage/locationIcon";
import { SearchIcon } from "@/svg/LandingPage/SearchIcon";
import React from "react";

export default function SearchBox() {
    return (
        <div className="relative z-10 mt-6 lg:mt-7 lg:min-w-[852px]">
            <div className="bg-white shadow-lg p-4  flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">
                <div className="flex items-center gap-3 flex-1 lg:border-r lg:border-[#D6DDEB] lg:pr-5">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        className="w-full outline-none text-[16px] text-[#25324B] placeholder:text-[#7C8493] bg-transparent border-b pt-4 pb-2"
                    />
                </div>

                <div className="flex items-center gap-3 flex-1 lg:pl-5">
                    <LocationIcon />
                    <div className="flex items-center justify-between w-full lg:border-b pt-2 lg:pt-4 pb-2 ">
                        <span className="text-[16px] text-[#25324B]">
                            Florence, Italy
                        </span>
                        <DownArrowIcon />
                    </div>
                </div>

                {/* Search Button */}
                <div className="lg:ml-5">
                    <Button className="w-full lg:w-auto px-8 py-3 text-[18px] font-bold">
                        Search my job
                    </Button>
                </div>
            </div>

            <p className="mt-4 text-[16px] text-[#202430]/70 pb-11 lg:pb-0">
                <span>Popular : </span>
                UI Designer, UX Researcher, Android, Admin
            </p>
        </div>
    );
}
