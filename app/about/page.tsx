"use client";

import AboutScreen from "@/components/screens/AboutScreen";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <main className="relative w-full h-screen overflow-hidden select-none">
      <AboutScreen onBack={() => router.push("/")} />
    </main>
  );
}
