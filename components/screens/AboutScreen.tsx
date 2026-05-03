"use client";

import { McButton } from "../MinecraftMenu";

export default function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      {/* Dirt Background Overlay */}
      <div 
        className="fixed inset-0 z-[-1] brightness-[0.25]"
        style={{ 
          backgroundImage: "url('/textures/ui/dirt.png')", 
          backgroundSize: "64px",
          imageRendering: "pixelated"
        }}
      />

      <h2 className="font-minecraft text-[24px] text-white [text-shadow:2px_2px_0px_#3f3f3f] mb-8 select-none">
        About Me
      </h2>

      {/* Content Box */}
      <div className="w-[600px] max-w-[90vw] flex flex-col gap-6 text-center">
        <p className="font-minecraft text-[12px] text-white leading-relaxed [text-shadow:1px_1px_0px_#3f3f3f]">
          Hey, I&apos;m Artur. I&apos;m an 18-year-old Full-Stack Engineer from Lviv, Ukraine.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 border-[2px] border-black">
                <span className="font-minecraft text-[10px] text-[#aaa] block mb-1">Experience</span>
                <span className="font-minecraft text-[12px] text-white">8 Years Coding</span>
            </div>
            <div className="bg-black/40 p-4 border-[2px] border-black">
                <span className="font-minecraft text-[10px] text-[#aaa] block mb-1">Education</span>
                <span className="font-minecraft text-[12px] text-white">LNU Student</span>
            </div>
            <div className="bg-black/40 p-4 border-[2px] border-black">
                <span className="font-minecraft text-[10px] text-[#aaa] block mb-1">Specialty</span>
                <span className="font-minecraft text-[12px] text-white">AI & Web Engines</span>
            </div>
            <div className="bg-black/40 p-4 border-[2px] border-black">
                <span className="font-minecraft text-[10px] text-[#aaa] block mb-1">Location</span>
                <span className="font-minecraft text-[12px] text-white">Lviv, UA</span>
            </div>
        </div>

        <p className="font-minecraft text-[10px] text-[#ccc] italic [text-shadow:1px_1px_0px_#3f3f3f] mt-4">
          &ldquo;I build digital worlds, one pixel at a time. Obsessed with performance, 
          immersion, and the intersection of AI and human creativity.&rdquo;
        </p>
      </div>

      {/* Done Button */}
      <div className="mt-12 w-[300px]">
        <McButton onClick={onBack}>Done</McButton>
      </div>
    </div>
  );
}
