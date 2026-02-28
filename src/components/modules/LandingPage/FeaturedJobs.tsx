import ShowAllJobsButton from "./ShowAllJobsButton";

export default function FeaturedJobs() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end">
                <h1 className="text-[32px] md:text-[48px] font-semibold">
                    Featured <span className="text-[#26A4FF]">jobs</span>
                </h1>
                <div className="hidden lg:block">
                    <ShowAllJobsButton />
                </div>
            </div>

            <div className="mt-6 lg:mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                {/* {ExploreCategories.map((category) => (
                            <ExploreCategoryCard
                                key={category.id}
                                category={category}
                            />
                        ))} */}
            </div>

            <div className="lg:hidden mt-5">
                <ShowAllJobsButton />
            </div>
        </div>
    );
}
