import React from "react";
import ShowAllJobsButton from "./ShowAllJobsButton";
import ExploreCategoryCard from "./ExploreCategoryCard";
import { ExploreCategories } from "@/content/landingPage/ExploreCategory";

export default function ExploreCategory() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end">
                <h1 className="text-[32px] md:text-[48px] font-semibold">
                    Explore by <span className="text-[#26A4FF]">category</span>
                </h1>
                <div className="hidden lg:block">
                    <ShowAllJobsButton />
                </div>
            </div>

            <div className="mt-6 lg:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                {ExploreCategories.map((category) => (
                    <ExploreCategoryCard
                        key={category.id}
                        category={category}
                    />
                ))}
            </div>

            <div className="lg:hidden mt-5">
                <ShowAllJobsButton />
            </div>
        </div>
    );
}
