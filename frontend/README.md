# ÉLOITE — Business Intelligence

AI-powered business intelligence platform for CFOs, warehouse managers, finance teams, and business owners.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Supabase Auth (email/password + Google OAuth)
- **Database**: Supabase (Postgres) — *coming soon*
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Email**: Brevo SMTP via Supabase

## Features

- Dashboard with live business health metrics
- Inventory Intelligence with AI-powered reorder predictions
- Invoice Intelligence with OCR and fraud detection
- GST Compliance monitoring and filing calendar
- Payments tracking and aging analysis
- Business Health score with radar chart
- AI Insights copilot
- Forecast Analytics with confidence bands
- Reports generation
- Full auth: signup, login, forgot password, reset password, email confirmation
- Dark mode with system preference detection
- Fully responsive (mobile + tablet + desktop)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Configure Supabase

- **Authentication → SMTP**: Add Brevo SMTP credentials for transactional emails
- **Authentication → Email Templates**: Customise confirmation and reset emails
- **Authentication → URL Configuration**: Set Site URL to `http://localhost:3000` for dev
- **Authentication → Providers**: Enable Google OAuth (optional)

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth Flow

| Route | Description |
|---|---|
| `/login` | Email/password + Google OAuth |
| `/signup` | Create account with email confirmation |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Set new password after clicking email link |
| `/verified` | Email confirmed success page |
| `/auth/callback` | OAuth redirect handler |
| `/auth/confirm` | Email token verification |

## Pages

| Route | Page |
|---|---|
| `/` | Dashboard |
| `/inventory` | Inventory Intelligence |
| `/invoice` | Invoice Intelligence |
| `/gst` | GST Compliance |
| `/payments` | Payments |
| `/health` | Business Health |
| `/ai` | AI Insights |
| `/forecast` | Forecast Analytics |
| `/reports` | Reports |
| `/settings` | Settings |
| `/support` | Support |
