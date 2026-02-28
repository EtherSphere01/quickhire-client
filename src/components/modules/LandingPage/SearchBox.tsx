"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DownArrowIcon } from "@/svg/LandingPage/DownArrowIcon";
import { LocationIcon } from "@/svg/LandingPage/locationIcon";
import { SearchIcon } from "@/svg/LandingPage/SearchIcon";

export default function SearchBox() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (location.trim()) params.set("location", location.trim());
        router.push(`/find-jobs?${params.toString()}`);
    };

    const handlePopular = (keyword: string) => {
        router.push(`/find-jobs?search=${encodeURIComponent(keyword)}`);
    };

    return (
        <div className="relative z-10 mt-6 lg:mt-7 lg:min-w-213">
            <div className="bg-white shadow-lg p-4  flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">
                <div className="flex items-center gap-3 flex-1 lg:border-r lg:border-[#D6DDEB] lg:pr-5">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full outline-none text-[16px] text-[#25324B] placeholder:text-[#7C8493] bg-transparent border-b pt-4 pb-2"
                    />
                </div>

                <div className="flex items-center gap-3 flex-1 lg:pl-5">
                    <LocationIcon />
                    <div className="flex items-center justify-between w-full lg:border-b pt-2 lg:pt-4 pb-2 ">
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            className="w-full outline-none text-[16px] text-[#25324B] placeholder:text-[#7C8493] bg-transparent"
                        />
                        <DownArrowIcon />
                    </div>
                </div>

                {/* Search Button */}
                <div className="lg:ml-5">
                    <Button
                        onClick={handleSearch}
                        className="w-full lg:w-auto px-8 py-3 text-[18px] font-bold cursor-pointer"
                    >
                        Search my job
                    </Button>
                </div>
            </div>

            <p className="mt-4 text-[16px] text-[#202430]/70 pb-11 lg:pb-0">
                <span>Popular : </span>
                {["UI Designer", "UX Researcher", "Android", "Admin"].map(
                    (kw, i) => (
                        <span key={kw}>
                            <button
                                onClick={() => handlePopular(kw)}
                                className="hover:text-[#4640DE] hover:underline transition-colors cursor-pointer"
                            >
                                {kw}
                            </button>
                            {i < 3 && ", "}
                        </span>
                    ),
                )}
            </p>
        </div>
    );
}
