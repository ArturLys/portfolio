import type { Metadata } from "next";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";

export const metadata: Metadata = {
  title: "Artur Lys — Full-Stack Engineer",
  description:
    "Portfolio of Artur Lys. Full-stack engineer specializing in Next.js, TypeScript, AI integration, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/textures/ui/button.png" as="image" />
        <link rel="preload" href="/textures/ui/button_highlighted.png" as="image" />
        <link rel="preload" href="/textures/ui/button_disabled.png" as="image" />
        <link rel="preload" href="/title.png" as="image" />
      </head>
      <body className="h-full flex flex-col bg-black font-minecraft overflow-hidden antialiased text-white">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
