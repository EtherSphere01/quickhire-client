export interface FeaturedJobProps {
    id: number;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    description: string;
    jobType: string;
    categories: { name: string; color: string; bgColor: string }[];
    borderColor: string;
}

export const FeaturedJobsData: FeaturedJobProps[] = [
    {
        id: 1,
        title: "Email Marketing",
        company: "Revolut",
        companyLogo: "/Images/companies/Revolut.svg",
        location: "Madrid, Spain",
        description:
            "Revolut is looking for Email Marketing to help team ma ...",
        jobType: "Full Time",
        categories: [
            { name: "Marketing", color: "#FFB836", bgColor: "#EB85331A" },
            { name: "Design", color: "#56CDAD", bgColor: "#56CDAD1A" },
        ],
        borderColor: "#4640DE",
    },
    {
        id: 2,
        title: "Brand Designer",
        company: "Dropbox",
        companyLogo: "/Images/companies/Dropbox.svg",
        location: "San Francisco, US",
        description:
            "Dropbox is looking for Brand Designer to help the team t ...",
        jobType: "Full Time",
        categories: [
            { name: "Design", color: "#56CDAD", bgColor: "#56CDAD1A" },
            { name: "Business", color: "#4640DE", bgColor: "#4640DE1A" },
        ],
        borderColor: "#FFB836",
    },
    {
        id: 3,
        title: "Email Marketing",
        company: "Pitch",
        companyLogo: "/Images/companies/Pitch.svg",
        location: "Berlin, Germany",
        description:
            "Pitch is looking for Customer Manager to join marketing t ...",
        jobType: "Full Time",
        categories: [
            { name: "Marketing", color: "#FFB836", bgColor: "#EB85331A" },
        ],
        borderColor: "#56CDAD",
    },
    {
        id: 4,
        title: "Visual Designer",
        company: "Blinklist",
        companyLogo: "/Images/companies/Blinklist.svg",
        location: "Granada, Spain",
        description:
            "Blinklist is looking for Visual Designer to help team del ...",
        jobType: "Full Time",
        categories: [
            { name: "Design", color: "#56CDAD", bgColor: "#56CDAD1A" },
        ],
        borderColor: "#FF6550",
    },
    {
        id: 5,
        title: "Product Designer",
        company: "ClassPass",
        companyLogo: "/Images/companies/ClassPass.svg",
        location: "Manchester, UK",
        description: "ClassPass is looking for Product Designer to help us ...",
        jobType: "Full Time",
        categories: [
            { name: "Marketing", color: "#FFB836", bgColor: "#EB85331A" },
            { name: "Design", color: "#56CDAD", bgColor: "#56CDAD1A" },
        ],
        borderColor: "#26A4FF",
    },
    {
        id: 6,
        title: "Lead Designer",
        company: "Canva",
        companyLogo: "/Images/companies/Canva.svg",
        location: "Ontario, Canada",
        description: "Canva is looking for Lead Designer to help develop n ...",
        jobType: "Full Time",
        categories: [
            { name: "Design", color: "#56CDAD", bgColor: "#56CDAD1A" },
            { name: "Business", color: "#4640DE", bgColor: "#4640DE1A" },
        ],
        borderColor: "#FFB836",
    },
    {
        id: 7,
        title: "Brand Strategist",
        company: "GoDaddy",
        companyLogo: "/Images/companies/godaddy.svg",
        location: "Marseille, France",
        description:
            "GoDaddy is looking for Brand Strategist to join the team ...",
        jobType: "Full Time",
        categories: [
            { name: "Marketing", color: "#FFB836", bgColor: "#EB85331A" },
        ],
        borderColor: "#56CDAD",
    },
    {
        id: 8,
        title: "Data Analyst",
        company: "Twitter",
        companyLogo: "/Images/companies/Twitter.svg",
        location: "San Diego, US",
        description:
            "Twitter is looking for Data Analyst to help team learn ...",
        jobType: "Full Time",
        categories: [
            { name: "Technology", color: "#FF6550", bgColor: "#FF65501A" },
        ],
        borderColor: "#4640DE",
    },
];
