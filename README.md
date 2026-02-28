# QuickHire — Client

A modern job board frontend built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Users can browse jobs, search/filter listings, and apply directly. Admins can manage job postings through a dedicated dashboard.

## Live Demo

- **Frontend:** [https://quickhire-client.vercel.app](https://quickhire-client.vercel.app)
- **Backend:** [https://quickhire-server-three.vercel.app](https://quickhire-server-three.vercel.app)

## GitHub Repositories

- **Client:** [https://github.com/EtherSphere01/quickhire-client](https://github.com/EtherSphere01/quickhire-client)
- **Server:** [https://github.com/EtherSphere01/quickhire-server](https://github.com/EtherSphere01/quickhire-server)

## Tech Stack

| Technology   | Version     |
| ------------ | ----------- |
| Next.js      | 16.1.6      |
| React        | 19.2.3      |
| TypeScript   | 5.x         |
| Tailwind CSS | 4.x         |
| shadcn/ui    | new-york-v4 |

## Features

- Landing page with featured jobs, latest jobs, and company showcase
- Job search with keyword, location, and category filters
- Job detail page with application form
- User authentication (register / login / logout)
- Admin dashboard with stats overview, top applied job, company statistics, recent applicants, and job type breakdown
- Admin job management with full CRUD and server-side pagination
- Company logo upload via Cloudinary
- Server-side pagination across all listing pages
- Responsive design (mobile + desktop)
- Skeleton loading states for better UX
- Auto-fill applicant name and email from auth context

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9 / **pnpm** >= 10 / **yarn** >= 1.22
- Running backend server (see [quickhire-server](../quickhire-server/README.md))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EtherSphere01/quickhire-client.git
cd quickhire-client
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment setup

Copy the example env file and update values:

```bash
cp .env.example .env
```

| Variable  | Description                 | Default                 |
| --------- | --------------------------- | ----------------------- |
| `API_URL` | Backend API server base URL | `http://localhost:5000` |

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script  | npm             | pnpm         | yarn         | Description                  |
| ------- | --------------- | ------------ | ------------ | ---------------------------- |
| `dev`   | `npm run dev`   | `pnpm dev`   | `yarn dev`   | Start dev server (Turbopack) |
| `build` | `npm run build` | `pnpm build` | `yarn build` | Create production build      |
| `start` | `npm run start` | `pnpm start` | `yarn start` | Start production server      |
| `lint`  | `npm run lint`  | `pnpm lint`  | `yarn lint`  | Run ESLint                   |

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── (public)/            # Public pages
│   │   ├── page.tsx         # Landing page
│   │   ├── find-jobs/       # Job search with filters
│   │   └── job/[id]/        # Job detail + apply
│   └── admin/               # Admin dashboard
│       ├── page.tsx          # Dashboard overview
│       └── jobs/             # Job management (CRUD)
├── api/                     # API fetch functions
│   ├── auth.ts              # Login, register, logout, refresh
│   ├── jobs.ts              # Job CRUD + dashboard stats
│   ├── applications.ts      # Apply, list by job, list all
│   └── types.ts             # Shared types, pagination meta
├── components/
│   ├── modules/             # Feature-specific components
│   ├── shared/              # Header, Footer, Spinner
│   └── ui/                  # shadcn/ui primitives
├── lib/                     # Utilities, job cache
├── svg/                     # SVG icon components
└── utils/                   # Nav items, helpers
```

## Admin Credentials (Demo)

| Email           | Password |
| --------------- | -------- |
| admin@gmail.com | 123456   |
