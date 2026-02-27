import { Button } from "@/components/ui/button";
import React from "react";

export default function SearchBox() {
    return (
        <div className="relative z-10 mt-6 lg:mt-7">
            {/* Search Card */}
            <div className="bg-white shadow-lg p-4 lg:py-4 lg:px-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">
                {/* Job Title Input */}
                <div className="flex items-center gap-3 flex-1 lg:border-r lg:border-[#D6DDEB] lg:pr-5">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                    >
                        <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                            stroke="#25324B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 21L16.65 16.65"
                            stroke="#25324B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        className="w-full outline-none text-[16px] text-[#25324B] placeholder:text-[#A8ADB7] bg-transparent"
                    />
                </div>

                {/* Divider - mobile */}
                <div className="border-t border-[#D6DDEB] lg:hidden" />

                {/* Location Select */}
                <div className="flex items-center gap-3 flex-1 lg:pl-5">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                    >
                        <path
                            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                            stroke="#25324B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                            stroke="#25324B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[16px] text-[#25324B]">
                            Florence, Italy
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0"
                        >
                            <path
                                d="M4 6L8 10L12 6"
                                stroke="#25324B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Search Button */}
                <div className="lg:ml-5">
                    <Button className="w-full lg:w-auto px-8 py-3 text-[16px] font-bold">
                        Search my job
                    </Button>
                </div>
            </div>

            {/* Popular Tags */}
            <p className="mt-4 text-[16px] text-[#515B6F]">
                <span className="font-medium text-[#25324B]">Popular : </span>
                UI Designer, UX Researcher, Android, Admin
            </p>
        </div>
    );
}
