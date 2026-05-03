"use client";

import AchievementsScreen from "@/components/screens/AchievementsScreen";
import { useRouter } from "next/navigation";

export default function AchievementsPage() {
  const router = useRouter();
  return (
    <main className="relative w-full h-screen overflow-hidden select-none">
      <AchievementsScreen onBack={() => router.push("/")} />
    </main>
  );
}
