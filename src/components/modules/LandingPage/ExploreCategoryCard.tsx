import { categoryProps } from "@/content/landingPage/ExploreCategory";
import { RightArrowIcon } from "@/svg/LandingPage/RightArrowIcon";
import React from "react";

export default function ExploreCategoryCard({
    category,
}: {
    category: categoryProps;
}) {
    return (
        <div className="border border-[#D6DDEB] px-4 py-5.5 lg:p-8 group cursor-pointer hover:bg-[#4640DE] hover:border-[#4640DE] transition-colors duration-200 ">
            <div className="flex flex-row lg:flex-col w-full items-center lg:items-start gap-8">
                <div className="text-[#4640DE] group-hover:text-white">
                    <div className="hidden md:block">
                        {<category.icon width="48" height="48" />}
                    </div>
                    <div className="md:hidden">
                        {<category.icon width="40" height="40" />}
                    </div>
                </div>
                <div className="w-full text-[#4640DE] group-hover:text-white">
                    <h4 className="text-[20px] font-semibold md:text-[24px]">
                        {category.name}
                    </h4>
                    <div className="flex items-center justify-between w-full  mt-0.5 mg:mt-3 text-[#4640DE] group-hover:text-white">
                        <p className="text-[14px] font-normal text-[#7C8493] md:text-[18px] group-hover:text-white">
                            {category.availableJobs} jobs available
                        </p>
                        <div className="text-[#25324B] group-hover:text-white">
                            <RightArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
