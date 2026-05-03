"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";

const PanoramaBackground = lazy(() => import("./PanoramaBackground"));

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Listen for Esc key globally
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <PanoramaBackground onLoad={() => setIsLoaded(true)} />
        </Suspense>
      </div>
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Loading Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-1000 ease-in-out flex flex-col items-center justify-center ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-[#aaa] font-minecraft text-[24px]">Loading terrain...</span>
      </div>
    </>
  );
}
