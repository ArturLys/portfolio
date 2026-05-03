"use client";

import { McButton } from "../MinecraftMenu";
import { Mail, Globe, Send, Github } from "lucide-react";

interface Server {
  id: string;
  name: string;
  address: string;
  icon: React.ReactNode;
  ping: string;
  url: string;
}

const SERVERS: Server[] = [
  {
    id: "email",
    name: "Primary Mail",
    address: "arturlys.dev@gmail.com",
    icon: <Mail size={24} />,
    ping: "24ms",
    url: "mailto:arturlys.dev@gmail.com",
  },
  {
    id: "telegram",
    name: "Telegram DM",
    address: "@ArturLys",
    icon: <Send size={24} />,
    ping: "12ms",
    url: "https://t.me/ArturLys",
  },
  {
    id: "linkedin",
    name: "LinkedIn Network",
    address: "Artur Lys",
    icon: <Globe size={24} />,
    ping: "45ms",
    url: "https://linkedin.com/in/ArturLys",
  },
];

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center pt-16 bg-black/70">
      <h2 className="font-minecraft text-[24px] text-white [text-shadow:2px_2px_0px_#3f3f3f] mb-8 select-none">
        Play Multiplayer
      </h2>

      {/* Server List */}
      <div className="flex-1 w-[600px] max-w-[90vw] overflow-y-auto scrollbar-mc pr-2">
        <div className="flex flex-col gap-2">
          {SERVERS.map((s) => (
            <div
              key={s.id}
              onClick={() => window.open(s.url, "_blank")}
              className="group flex gap-4 p-2 border-[2px] border-transparent hover:border-white cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#333] flex items-center justify-center border-[2px] border-black group-hover:bg-[#444] transition-colors">
                 <div className="text-white opacity-80 group-hover:opacity-100">
                    {s.icon}
                 </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="font-minecraft text-[14px] text-white">{s.name}</span>
                <span className="font-minecraft text-[10px] text-[#aaa]">
                   {s.address}
                </span>
              </div>
              <div className="flex items-center pr-4">
                 <span className="font-minecraft text-[10px] text-green-500">{s.ping}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="w-full bg-black/80 py-2 border-t-[2px] border-[#333] text-center">
         <span className="font-minecraft text-[10px] text-[#888] animate-pulse">
            Scanning for servers...
         </span>
      </div>

      {/* Bottom Controls */}
      <div className="py-8 w-[600px] max-w-[90vw] grid grid-cols-2 gap-2">
         <McButton onClick={onBack}>Join Server</McButton>
         <McButton onClick={onBack}>Direct Connect</McButton>
         <McButton onClick={onBack}>Add Server</McButton>
         <McButton onClick={onBack}>Cancel</McButton>
      </div>
    </div>
  );
}
