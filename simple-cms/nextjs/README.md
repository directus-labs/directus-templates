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

### Folder Structure

```
src/
├── app/                              # Next.js App Router pages and layouts
│   ├── blog/                         # Blog-related routes
│   │   ├── [slug]/                   # Dynamic blog post route
│   │   │   └── page.tsx
│   ├── [permalink]/                  # Dynamic page route
│   │   └── page.tsx
│   ├── layout.tsx                    # Shared layout for all routes
├── components/
│   ├── blocks/                       # Reusable page components relating to Directus blocks
│   │   ├── Button.tsx
│   │   ├── ButtonGroup.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── Posts.tsx
│   │   ├── PricingCard.tsx
│   │   └── RichText.tsx
│   ├── layout/                       # Layout-related components
│   │   ├── Footer.tsx
│   │   ├── NavigationBar.tsx
│   │   └── PageBuilder.tsx           # Assembles blocks into pages
│   ├── shared/                       # Project-specific reusable utilities
│   │   ├── DirectusImage.tsx         # Renders images from Directus
│   ├── ui/                           # UI primitives and reusable ShadCN components
│   │   ├── badge.tsx                 # shadcn
│   │   ├── button.tsx                # shadcn
│   │   ├── collapsible.tsx           # shadcn
│   │   ├── dialog.tsx                # shadcn
│   │   ├── dropdown-menu.tsx          # shadcn
│   │   ├── input.tsx                 # shadcn
│   │   ├── label.tsx                 # shadcn
│   │   ├── navigation-menu.tsx        # shadcn
│   │   ├── separator.tsx             # shadcn
│   │   ├── ThemeProvider.tsx         # Light/dark mode provider
│   │   ├── ThemeToggle.tsx           # Toggle light/dark mode
│   │   ├── Headline.tsx
│   │   ├── ShareDialog.tsx
│   │   ├── Text.tsx
│   │   └── Title.tsx
├── lib/                              # Utilities and global logic
│   ├── directus/                     # Directus-related utilities
│   │   ├── directus.ts               # Directus client setup
│   │   ├── fetchers.ts               # Directus data fetching
│   │   └── generateDirectusTypes.ts  # Generates Directus types
│   ├── styles/                       # Global and shared styles
│   │   ├── fonts.css
│   │   └── globals.css
│   ├── utils.ts
├── types/                            # TypeScript types
│   └── directus-schema.ts            # Directus-generated types
```
