import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col bg-black font-minecraft">
        {children}
      </body>
    </html>
  );
}
