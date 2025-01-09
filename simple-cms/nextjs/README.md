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
- **Preview Mode**: Built-in draft/live preview for editing unpublished content.

## **Getting Started**

### Prerequisites

To set up this template, ensure you have the following:

- **Node.js** (16.x or newer)
- **npm** or **pnpm**
- Access to a **Directus** instance ([cloud or self-hosted](../../README.md))

### **Environment Variables**

To get started, you need to configure environment variables. Follow these steps:

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Update the following variables in your `.env` file:**

   - **`NEXT_PUBLIC_DIRECTUS_URL`**: URL of your Directus instance.
   - **`DIRECTUS_PUBLIC_TOKEN`**: Public token for accessing public resources in Directus. Use the token from the
     **Webmaster** account.
   - **`DIRECTUS_FORM_TOKEN`**: Token from the **Frontend Bot User** account in Directus for handling form submissions.
   - **`NEXT_PUBLIC_SITE_URL`**: The public URL of your site. This is used for SEO metadata and blog post routing.
   - **`DRAFT_MODE_SECRET`**: The secret you generate for live preview. This is used to view draft posts in directus and
     live edits.

## **Running the Application**

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000).

## Generate Directus Types

This repository includes a [utility](https://www.npmjs.com/package/directus-sdk-typegen) to generate TypeScript types
for your Directus schema.

#### Usage

1. Ensure your `.env` file is configured as described above.
2. Run the following command:
   ```bash
   npm run generate:types
   ```

## Folder Structure

```
src/
├── app/                              # Next.js App Router and APIs
│   ├── blog/                         # Blog-related routes
│   │   ├── [slug]/                   # Dynamic blog post route
│   │   │   └── page.tsx
│   ├── [permalink]/                  # Dynamic page route
│   │   └── page.tsx
│   ├── api/                          # API routes for draft/live preview and search
│   │   ├── draft/                    # Routes for draft previews
│   │   │   └── route.ts
│   │   ├── search/                   # Routes for search functionality
│   │   │   └── route.ts
│   ├── layout.tsx                    # Shared layout for all routes
├── components/                       # Reusable components
│   ├── blocks/                       # CMS blocks (Hero, Gallery, etc.)
│   │   └── ...
│   ├── forms/                        # Form components
│   │   ├── DynamicForm.tsx           # Renders dynamic forms with validation
│   │   ├── FormBuilder.tsx           # Manages form lifecycles and submission
│   │   ├── FormField.tsx             # Renders individual form fields dynamically
│   │   └── fields/                   # Form fields components
│   │   └── ...
│   ├── layout/                       # Layout components
│   │   ├── Footer.tsx
│   │   ├── NavigationBar.tsx
│   │   └── PageBuilder.tsx           # Assembles blocks into pages
│   ├── shared/                       # Shared utilities
│   │   └── DirectusImage.tsx         # Renders images from Directus
│   ├── ui/                           # Shadcn and other base UI components
│   │   └── ...
├── lib/                              # Utility and global logic
│   ├── directus/                     # Directus utilities
│   │   ├── directus.ts               # Directus client setup
│   │   ├── fetchers.ts               # API fetchers
│   │   ├── forms.ts                  # Directus form handling
│   │   ├── generateDirectusTypes.ts  # Generates Directus types
│   │   └── directus-utils.ts         # General Directus helpers
│   ├── zodSchemaBuilder.ts           # Zod validation schemas
├── styles/                           # Global styles
│   └── ...
├── types/                            # TypeScript types
│   └── directus-schema.ts            # Directus-generated types
```

---
