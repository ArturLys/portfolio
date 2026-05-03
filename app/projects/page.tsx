"use client";

import ProjectsScreen from "@/components/screens/ProjectsScreen";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <main className="relative w-full h-screen overflow-hidden select-none">
      <ProjectsScreen onBack={() => router.push("/")} />
    </main>
  );
}
