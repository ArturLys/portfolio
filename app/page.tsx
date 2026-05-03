"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import MinecraftMenu from "@/components/MinecraftMenu";
import AchievementsScreen from "@/components/screens/AchievementsScreen";
import ProjectsScreen from "@/components/screens/ProjectsScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import ContactScreen from "@/components/screens/ContactScreen";

const PanoramaBackground = lazy(
  () => import("@/components/PanoramaBackground")
);

export type ScreenState = "MAIN" | "ACHIEVEMENTS" | "PROJECTS" | "ABOUT" | "CONTACT";

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("MAIN");

  // Handle browser back button (rudimentary SPA routing)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "").toUpperCase();
      if (["ACHIEVEMENTS", "PROJECTS", "ABOUT", "CONTACT"].includes(hash)) {
        setScreen(hash as ScreenState);
      } else {
        setScreen("MAIN");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (newScreen: ScreenState) => {
    setScreen(newScreen);
    if (newScreen === "MAIN") {
      window.history.pushState(null, "", "/");
    } else {
      window.history.pushState(null, "", `#${newScreen.toLowerCase()}`);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black select-none">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <PanoramaBackground />
      </Suspense>

      {/* Screens */}
      {screen === "MAIN" && <MinecraftMenu onNavigate={navigateTo} />}
      {screen === "ACHIEVEMENTS" && <AchievementsScreen onBack={() => navigateTo("MAIN")} />}
      {screen === "PROJECTS" && <ProjectsScreen onBack={() => navigateTo("MAIN")} />}
      {screen === "ABOUT" && <AboutScreen onBack={() => navigateTo("MAIN")} />}
      {screen === "CONTACT" && <ContactScreen onBack={() => navigateTo("MAIN")} />}
    </main>
  );
}
