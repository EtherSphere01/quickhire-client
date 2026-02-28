const COMPANY_LOGO_MAP: Record<string, string> = {
    Revolut: "/Images/companies/Revolut.svg",
    Dropbox: "/Images/companies/Dropbox.svg",
    Pitch: "/Images/companies/Pitch.svg",
    Blinklist: "/Images/companies/Blinklist.svg",
    ClassPass: "/Images/companies/ClassPass.svg",
    Canva: "/Images/companies/Canva.svg",
    GoDaddy: "/Images/companies/godaddy.svg",
    Twitter: "/Images/companies/Twitter.svg",
    Nomad: "/Images/companies/Nomad.svg",
    Terraform: "/Images/companies/Terraform.svg",
    Packer: "/Images/companies/Packer.svg",
    Netlify: "/Images/companies/netlify-logo.svg",
    Maze: "/Images/companies/Maze.svg",
    Udacity: "/Images/companies/Udacity.svg",
    Webflow: "/Images/companies/webFlow.svg",
};

export function getCompanyLogo(
    companyName: string,
    apiLogo?: string | null,
): string | null {
    if (apiLogo) return apiLogo;
    return COMPANY_LOGO_MAP[companyName] ?? null;
}
