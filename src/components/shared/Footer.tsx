import { AboutData } from "@/content/footer/about";
import { ResourcesData } from "@/content/footer/resources";
import { Logo } from "@/svg/Logo";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SocialLinksData } from "@/content/footer/socialLinks";

export default function Footer() {
    return (
        <footer className="container mx-auto px-4 py-10 lg:py-16 text-[#D6DDEB]">
            <div className="flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-start">
                <div>
                    <div className="flex items-center gap-2">
                        <Logo />
                        <p className="font-red-hat-display text-white font-bold text-[24px]">
                            QuickHire
                        </p>
                    </div>
                    <p className="w-full md:w-94 mt-8">
                        Great platform for the job seeker that passionate about
                        startups. Find your dream job easier.
                    </p>
                </div>

                <div className="flex items-start justify-between w-full lg:w-70 2xl:w-98.75">
                    <div>
                        <span className="text-white text-[18px] font-semibold">
                            About
                        </span>
                        <div className="flex flex-col">
                            {AboutData.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.link}
                                    className="mt-4.5 text-[16px] hover:text-white"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-white text-[18px] font-semibold">
                            Resources
                        </span>
                        <div className="flex flex-col">
                            {ResourcesData.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.link}
                                    className="mt-4.5 text-[16px] hover:text-white"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <span className="text-white text-[18px] font-semibold">
                        Get job notifications
                    </span>
                    <p className="mt-4.5 text-[16px]">
                        The latest job news, articles, sent to your inbox
                        weekly.
                    </p>

                    <div className="mt-4 lg:mt-10 flex flex-col md:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Email Address"
                            className="border border-[#D6DDEB] bg-white  px-4 py-3 text-[#202430] placeholder:text-[#A8ADB7] w-full focus:outline-none  h-12.5"
                        />
                        <Button className="w-32.75 h-12.5 px-8 py-3 text-[16px] font-bold">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border-t-2 border-[#FFFFFF]/10 my-6 lg:my-20 pt-6 lg:pt-10 w-full flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[16px] font-medium text-[#FFFFFF]/40">
                    {new Date().getFullYear()} &copy; QuickHire. All rights
                    reserved.
                </p>
                <div className="flex items-center justify-center gap-6">
                    {SocialLinksData.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className=" h-8 w-8 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center "
                            aria-label={item.name}
                        >
                            {<item.icon />}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
