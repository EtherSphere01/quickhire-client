import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function PostingJobsBanner() {
    return (
        <div className="container mx-auto px-4">
            <div className="relative bg-[#4640DE] text-white overflow-hidden">
                <div className="px-4 lg:px-17.5 pt-22 lg:py-23.25 flex flex-col items-center lg:items-start z-50">
                    <h1 className="text-[32px] md:text-[48px] leading-[110%] font-semibold w-91 text-center lg:text-start">
                        Start posting jobs today
                    </h1>
                    <p className="text-center lg:text-start mt-4 lg:mt-6 text-[16px]">
                        Start posting jobs for only $10.
                    </p>
                    <Button
                        variant="secondary"
                        className="text-[16px] font-bold px-6 py-3 mt-4 lg:mt-6 w-full lg:w-44.75"
                    >
                        Sign Up For Free
                    </Button>
                </div>

                <div className="relative flex justify-center lg:absolute lg:right-10 lg:bottom-0 lg:translate-y-1/6 lg:w-[45%] mt-6.5 lg:mt-0 z-50 pb-23.75 lg:pb-0">
                    <Image
                        src="/images/DashboardCompany.svg"
                        alt="Posting Jobs Banner"
                        width={500}
                        height={500}
                        className="w-[92%] md:w-[95%] lg:w-full object-contain object-center"
                    />
                </div>
                <div className="h-50 w-100 bg-white rotate-[-30deg] absolute -right-30 -bottom-40.5 md:-bottom-32 lg:-bottom-35 "></div>
                <div className="h-50 w-100 bg-white rotate-[-30deg] absolute -left-30 -top-40.5 md:-top-32 lg:-top-35 z-10"></div>
            </div>
        </div>
    );
}
