# Job Tracker Client

AI-powered job application tracker frontend built with React 19 and Vite 8.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** react-router-dom 7
- **State:** Zustand 5 (auth) + TanStack React Query 5 (server state)
- **API Client:** Axios 1 (with auto token refresh)
- **Forms:** react-hook-form 7
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Charts:** Recharts
- **Notifications:** react-hot-toast

## Project Structure

```
src/
├── api/              # Axios client and endpoint modules (auth, jobs, resume, user)
├── components/       # Reusable UI components
│   ├── dashboard/    # PipelineChart, QuickActions, RecentJobs
│   ├── jobs/         # JobCard, JobFilters, JobFormModal
│   ├── layout/       # AppLayout, Navbar, Sidebar, ProtectedRoute, PublicRoute
│   ├── resume/       # UploadZone, AnalysisResult
│   └── ui/           # Button, Input, StatsCard
├── hooks/            # useScrollTop, usePageTitle, useCountUp
├── Pages/            # Route-level page components
│   ├── auth/         # LoginPage, RegisterPage
│   ├── dashboard/    # DashboardPage, RemindersPage, SettingsPage
│   ├── jobs/         # JobsPage
│   └── resume/       # ResumePage
├── store/            # Zustand auth store (persisted to localStorage)
└── utils/            # Job utilities, color helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see [job-tracker-api](../job-tracker-api))

### Installation

```bash
npm install
```

### Environment

Edit `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview    # Preview the build locally
```

### Deploy to Vercel

Push to a Vercel-connected Git repo or use the Vercel CLI. The included `vercel.json` handles SPA routing.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | LandingPage | Marketing page with features, CTA, social proof |
| `/login` | LoginPage | Sign in with email/password |
| `/register` | RegisterPage | Create account |
| `/dashboard` | DashboardPage | Stats overview, pipeline chart, recent jobs |
| `/jobs` | JobsPage | Full job list with filters, pagination, CRUD modal |
| `/resume` | ResumePage | Upload PDF, AI-powered analysis |
| `/reminders` | RemindersPage | Manage follow-up reminders |
| `/settings` | SettingsPage | Edit profile, change password |

## Key Features

- **JWT auth** with automatic token refresh (request queue prevents race conditions)
- **6 job statuses** (Saved, Applied, Interview, Offer, Rejected, Withdrawn)
- **AI resume analysis** (skills, experience, education, suggestions)
- **Interactive pipeline dashboard** with Recharts bar chart
- **Reminders** with date/time picker and overdue alerts
- **Animated stats cards** with count-up effect
- **Responsive** with collapsible sidebar / mobile drawer
- **Dark mode ready** (Tailwind `darkMode: 'class'` configured)
