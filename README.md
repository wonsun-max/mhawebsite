# Manila Hankuk Academy Website (MHA Web)

A modern, full-stack web application for Manila Hankuk Academy, featuring a premium design, administrative tools, student management, and real-time features.

## 🚀 Features

- **Premium Design**: Modern glassmorphic UI with smooth animations (Framer Motion).
- **Comprehensive CMS**: Manage announcements, school albums, MK missionaries, and meal plans.
- **Admin Dashboard**: Modernized panel for site-wide management and statistics.
- **Authentication**: Secure Google OAuth and Credentials-based login using Next-Auth.
- **Media Management**: Integrated with Supabase for fast and secure file storage.
- **Academic Tools**: Shared calendar and inquiry system for admissions.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Auth**: [Next-Auth](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Storage**: [Supabase](https://supabase.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database
- Supabase account (for media storage)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mhaweb.git
   cd mhaweb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy `.env.example` to `.env.local` and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components/features`: Feature-specific components (Chatbot, Forms, etc.).
- `/components/layout`: Global layout components (Navbar, Footer, Background).
- `/components/providers`: Context and session providers.
- `/lib`: Shared utilities, data configurations, and database clients.
- `/prisma`: Database schema and migration files.
- `/scripts`: Administrative and maintenance scripts.

## 📄 License

This project is licensed under the MIT License.
