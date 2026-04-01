# Todo List

This project uses Next.js with Drizzle ORM using Neon database.

## What it does

This app allows you to create lists and add chores to each list. You can mark chores as done, edit them and delete them.

## Tech Stack

- Next.js 15 (App Router)
- Drizzle ORM
- Neon (PostgreSQL)
- Tailwind CSS
- TypeScript

## Getting Started

Clone the repository and install dependencies:

\`\`\`bash
pnpm install
\`\`\`

Add your database connection string to `.env.local`:

\`\`\`bash
DATABASE_URL="postgresql://..."
\`\`\`

Push the schema to your Neon database:

\`\`\`bash
npx drizzle-kit push
\`\`\`

Run the development server:

\`\`\`bash
pnpm run dev
\`\`\`

Seed the database with some chores:

\`\`\`bash
pnpm run seed
\`\`\`

## Project Structure

- `app/api` — API route handlers for lists and chores
- `app/lists` — Individual list pages
- `app/Chores` — Chores page
- `app/components` — Shared components
- `lib/db` — Drizzle client, schema and seed file