export interface LatestJobProps {
    id: number;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    tags: { name: string; color: string; borderColor: string }[];
}

export const LatestJobsData: LatestJobProps[] = [
    {
        id: 1,
        title: "Social Media Assistant",
        company: "Nomad",
        companyLogo: "/images/companies/nomad.svg",
        location: "Paris, France",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 2,
        title: "Brand Designer",
        company: "Dropbox",
        companyLogo: "/images/companies/dropbox.svg",
        location: "San Fransisco, USA",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 3,
        title: "Interactive Developer",
        company: "Terraform",
        companyLogo: "/images/companies/terraform.svg",
        location: "Hamburg, Germany",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 4,
        title: "HR Manager",
        company: "Packer",
        companyLogo: "/images/companies/packer.svg",
        location: "Lucern, Switzerland",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 5,
        title: "Social Media Assistant",
        company: "Netlify",
        companyLogo: "/images/companies/netlify.svg",
        location: "Paris, France",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 6,
        title: "Brand Designer",
        company: "Maze",
        companyLogo: "/images/companies/maze.svg",
        location: "San Fransisco, USA",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 7,
        title: "Interactive Developer",
        company: "Udacity",
        companyLogo: "/images/companies/udacity.svg",
        location: "Hamburg, Germany",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
    {
        id: 8,
        title: "HR Manager",
        company: "Webflow",
        companyLogo: "/images/companies/webflow.svg",
        location: "Lucern, Switzerland",
        tags: [
            { name: "Full-Time", color: "#56CDAD", borderColor: "#56CDAD1A" },
            { name: "Marketing", color: "#FFB836", borderColor: "#FFB836" },
            { name: "Design", color: "#4640DE", borderColor: "#4640DE" },
        ],
    },
];
