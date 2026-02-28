import {
    BusinessIcon,
    DesignIcon,
    EngineeringIcon,
    FinanceIcon,
    HumanResourceIcon,
    MarketingIcon,
    SalesIcon,
    TechnologyIcon,
} from "@/svg/LandingPage/ExploreJobIcons";

export interface categoryProps {
    id: number;
    name: string;
    availableJobs: number;
    icon: React.ComponentType<{ width?: string; height?: string }>;
}

export const ExploreCategories: categoryProps[] = [
    {
        id: 1,
        name: "Design",
        availableJobs: 120,
        icon: DesignIcon,
    },
    {
        id: 2,
        name: "Sales",
        availableJobs: 80,
        icon: SalesIcon,
    },
    {
        id: 3,
        name: "Marketing",
        availableJobs: 60,
        icon: MarketingIcon,
    },
    {
        id: 4,
        name: "Finance",
        availableJobs: 40,
        icon: FinanceIcon,
    },
    {
        id: 5,
        name: "Technology",
        availableJobs: 150,
        icon: TechnologyIcon,
    },
    {
        id: 6,
        name: "Engineering",
        availableJobs: 80,
        icon: EngineeringIcon,
    },
    {
        id: 7,
        name: "Business",
        availableJobs: 70,
        icon: BusinessIcon,
    },
    {
        id: 8,
        name: "Human Resource",
        availableJobs: 50,
        icon: HumanResourceIcon,
    },
];
