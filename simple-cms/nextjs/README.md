# Next.js Simple CMS Template with Directus Integration

This is a **Next.js-based Simple CMS Template** that is fully integrated with [Directus](https://directus.io/), offering
a headless CMS solution for managing and delivering content seamlessly. The template leverages modern technologies like
the **Next.js App Router**, **Tailwind CSS**, and **Shadcn components**, providing a complete and scalable starting
point for building CMS-powered web applications.

## **Features**

- **Next.js App Router**: Uses the latest Next.js routing architecture for layouts and dynamic routes.
- **Full Directus Integration**: Directus API integration for fetching and managing relational data.
- **Tailwind CSS**: Fully integrated for rapid UI styling.
- **TypeScript**: Ensures type safety and reliable code quality.
- **Shadcn Components**: Pre-built, customizable UI components for modern design systems.
- **ESLint & Prettier**: Enforces consistent code quality and formatting.
- **Dynamic Page Builder**: A page builder interface for creating and customizing CMS-driven pages.
- **Modular and Scalable Structure**: Designed for extensibility and ease of maintenance.

## **Getting Started**

### Prerequisites

- **Node.js** (16.x or newer)
- **npm** or **pnpm**
- Access to a **Directus** instance (self-hosted or cloud-hosted)

### Generate Directus Types

This repository includes a [utility](https://www.npmjs.com/package/directus-sdk-typegen) to generate TypeScript types
for your Directus schema.

#### Usage

1. Ensure your `.env` file is configured with:
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=your-token-here
   DIRECTUS_TOKEN=your-token-here
   ```
2. Run with the following command
   ```bash
   npm run generate:types
   ```
