# QuickHire — Client

A modern job board frontend built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Users can browse jobs, search/filter listings, and apply directly. Admins can manage job postings through a dedicated dashboard.

## Live Demo

- **Frontend:** [https://quickhire-client.vercel.app](https://quickhire-client.vercel.app)
- **Backend:** [https://quickhire-server.vercel.app](https://quickhire-server.vercel.app)

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
- Admin dashboard with full CRUD for job postings
- Company logo upload via Cloudinary
- Responsive design (mobile + desktop)
- Skeleton loading states for better UX
- Auto-fill applicant name and email from auth context

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- Running backend server (see [quickhire-server](../quickhire-server/README.md))

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd quickhire-client
```

### 2. Install dependencies

```bash
npm install
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
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script  | Command         | Description                  |
| ------- | --------------- | ---------------------------- |
| `dev`   | `npm run dev`   | Start dev server (Turbopack) |
| `build` | `npm run build` | Create production build      |
| `start` | `npm run start` | Start production server      |
| `lint`  | `npm run lint`  | Run ESLint                   |

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
│   ├── jobs.ts              # Job CRUD operations
│   ├── applications.ts      # Apply & view applications
│   └── types.ts             # Shared types & constants
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
