import type { ReactNode } from "react";

import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Starters",
  description: "Starter Template for Simple CMS",
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
    <html suppressHydrationWarning lang="en">
      <body className={`bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class">
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
