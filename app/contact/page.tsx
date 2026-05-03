"use client";

import ContactScreen from "@/components/screens/ContactScreen";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  return (
    <main className="relative w-full h-screen overflow-hidden select-none">
      <ContactScreen onBack={() => router.push("/")} />
    </main>
  );
}
