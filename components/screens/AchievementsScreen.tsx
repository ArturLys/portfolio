"use client";

import { useState, useEffect } from "react";
import { McButton } from "../MinecraftMenu";
import { Globe, Cpu, Terminal, X, Lock, Server, Database, Cloud, Activity, Braces, Sparkles, Image as ImageIcon, Wrench } from "lucide-react";

interface AdvancementNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  parent?: string;
  locked?: boolean;
  type?: "task" | "goal" | "challenge";
}

// 1 grid unit = 64px x, 64px y
// Center Y is around 200
const WEB_ADVANCEMENTS: AdvancementNode[] = [
  { id: "html", title: "The Foundation", description: "HTML/CSS/JS/TS", icon: <Globe size={24} />, x: 40, y: 150 },
  { id: "react", title: "Reactive Power", description: "Modern React Development", icon: <Globe size={24} />, x: 120, y: 150, parent: "html" },
  { id: "nextjs", title: "The Next Level", description: "Next.js App Router & SSR", icon: <Globe size={24} />, x: 200, y: 150, parent: "react" },
  { id: "node", title: "Backend Engine", description: "Node / Express / WebSockets", icon: <Server size={24} />, x: 280, y: 100, parent: "nextjs" },
  { id: "prisma", title: "Data Smith", description: "Prisma & PostgreSQL", icon: <Database size={24} />, x: 280, y: 200, parent: "nextjs" },
];

const INFRA_ADVANCEMENTS: AdvancementNode[] = [
  { id: "git", title: "Timeline Control", description: "Git Version Control", icon: <Terminal size={24} />, x: 40, y: 150 },
  { id: "linux", title: "Kernel Access", description: "Linux Systems & Bash", icon: <Terminal size={24} />, x: 120, y: 150, parent: "git" },
  { id: "ssh", title: "Secure Shell", description: "Remote Server Management", icon: <Terminal size={24} />, x: 200, y: 150, parent: "linux" },
  { id: "aws", title: "The Cloud", description: "AWS EC2 / S3", icon: <Cloud size={24} />, x: 280, y: 150, parent: "ssh" },
  { id: "docker", title: "Contained", description: "Docker & Containerization", icon: <Terminal size={24} />, x: 360, y: 150, parent: "aws" },
  { id: "cicd", title: "Continuous Delivery", description: "CI/CD Pipelines", icon: <Lock size={24} />, x: 440, y: 150, parent: "docker", locked: true },
];

const AI_ADVANCEMENTS: AdvancementNode[] = [
  { id: "prompt", title: "Whisperer", description: "Advanced Prompt Design", icon: <Sparkles size={24} />, x: 40, y: 150 },
  { id: "llm", title: "Silicon Mind", description: "LLM Integration", icon: <Cpu size={24} />, x: 120, y: 150, parent: "prompt" },
  { id: "rag", title: "Living Knowledge", description: "RAG Pipelines", icon: <Database size={24} />, x: 200, y: 100, parent: "llm" },
  { id: "agents", title: "Autonomous Units", description: "Agentic AI Frameworks", icon: <Activity size={24} />, x: 280, y: 100, parent: "rag", type: "challenge" },
  { id: "vector", title: "Semantic Search", description: "Vector Databases", icon: <Lock size={24} />, x: 200, y: 40, parent: "rag", locked: true },
  { id: "lora", title: "Fine-Tuner", description: "LoRA Training", icon: <ImageIcon size={24} />, x: 200, y: 200, parent: "llm" },
  { id: "mcp", title: "Tool Maker", description: "MCP Development", icon: <Wrench size={24} />, x: 120, y: 220, parent: "prompt" },
];

export default function AchievementsScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"WEB" | "INFRA" | "AI">("WEB");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("mc_achievements");
    if (saved) {
      setCompleted(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleComplete = (id: string, locked?: boolean) => {
    if (locked) return;
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
    localStorage.setItem("mc_achievements", JSON.stringify(Array.from(next)));
  };

  const nodes = activeTab === "WEB" ? WEB_ADVANCEMENTS : activeTab === "INFRA" ? INFRA_ADVANCEMENTS : AI_ADVANCEMENTS;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* Achievements Window Container */}
      <div className="relative w-[850px] h-[550px] max-w-[95vw] max-h-[85vh] flex flex-col antialiased">
        
        {/* Tabs Row */}
        <div className="flex gap-1 ml-4 relative z-10">
          {(["WEB", "INFRA", "AI"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2 font-minecraft text-[14px] border-[3px] border-solid rounded-t-sm
                transition-none
                ${activeTab === tab 
                  ? "bg-[#c6c6c6] border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-[#c6c6c6] text-[#3f3f3f] pb-3 mb-[-3px]" 
                  : "bg-[#8b8b8b] border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-[#555555] text-white hover:bg-[#a0a0a0] mt-2"
                }
              `}
            >
              {tab === "WEB" && "Web"}
              {tab === "INFRA" && "Infrastructure"}
              {tab === "AI" && "AI  /  ML"}
            </button>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex-1 bg-[#c6c6c6] border-[4px] border-solid border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-[#555555] p-4 flex flex-col relative z-0">
          
          <div className="flex justify-between items-center mb-3">
             <h2 className="font-minecraft text-[18px] text-[#3f3f3f]">Advancements</h2>
             <button onClick={onBack} className="text-[#3f3f3f] hover:text-black">
                <X size={28} />
             </button>
          </div>

          {/* Scrolling Canvas Container */}
          <div className="flex-1 relative bg-[#222] border-[4px] border-solid border-t-[#555555] border-l-[#555555] border-r-[#ffffff] border-b-[#ffffff] overflow-hidden">
            
            {/* Tiling Stone Background */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: "url('/textures/ui/stone.png')", 
                backgroundSize: "64px",
                imageRendering: "pixelated",
                boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.5)"
              }}
            />

            {/* Draggable/Scrollable Area */}
            <div className="absolute inset-0 overflow-auto scrollbar-mc p-8">
              <div className="relative min-w-[800px] min-h-[400px]">
                
                {/* Draw Connection Lines First */}
                {nodes.map(node => {
                  if (!node.parent) return null;
                  const parent = nodes.find(n => n.id === node.parent);
                  if (!parent) return null;
                  
                  const isDone = completed.has(node.id) || node.locked;
                  
                  // Calculate line path
                  const startX = parent.x + 21; // Center of 42px parent
                  const startY = parent.y + 21;
                  const endX = node.x + 21;
                  const endY = node.y + 21;
                  
                  const width = Math.abs(endX - startX);
                  const height = Math.abs(endY - startY);
                  
                  const isHorizontal = startY === endY;
                  
                  return (
                    <div key={`line-${node.id}`} className="absolute" style={{ left: 0, top: 0 }}>
                      {isHorizontal ? (
                         <div 
                           className={`absolute h-[10px] border-y-[2px] border-black -translate-y-1/2 z-0
                           ${isDone ? "bg-white" : "bg-[#888]"}`}
                           style={{ left: Math.min(startX, endX), top: startY, width: width }}
                         />
                      ) : (
                         // L-shape connecting lines
                         <>
                           <div 
                             className={`absolute h-[10px] border-y-[2px] border-black -translate-y-1/2 z-0
                             ${isDone ? "bg-white" : "bg-[#888]"}`}
                             style={{ left: startX, top: startY, width: (endX - startX) / 2 + 5 }}
                           />
                           <div 
                             className={`absolute w-[10px] border-x-[2px] border-black -translate-x-1/2 z-0
                             ${isDone ? "bg-white" : "bg-[#888]"}`}
                             style={{ left: startX + (endX - startX) / 2, top: Math.min(startY, endY), height: height + 10 }}
                           />
                           <div 
                             className={`absolute h-[10px] border-y-[2px] border-black -translate-y-1/2 z-0
                             ${isDone ? "bg-white" : "bg-[#888]"}`}
                             style={{ left: startX + (endX - startX) / 2 - 5, top: endY, width: (endX - startX) / 2 + 5 }}
                           />
                         </>
                      )}
                    </div>
                  );
                })}

                {/* Draw Nodes */}
                {nodes.map((node) => {
                  const isDone = completed.has(node.id);
                  const isLocked = node.locked;
                  
                  const bgImage = node.type === "challenge" 
                    ? (isDone ? "url('/textures/ui/challenge_completed.webp')" : "url('/textures/ui/challenge.webp')")
                    : (isDone ? "url('/textures/ui/advancement_completed.png')" : "url('/textures/ui/advancement.png')");

                  return (
                    <div 
                      key={node.id}
                      className="absolute z-10"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div 
                        onClick={() => toggleComplete(node.id, isLocked)}
                        className={`
                          w-[42px] h-[42px] flex items-center justify-center relative group
                          transition-transform active:scale-95
                          ${isLocked ? "grayscale opacity-50 cursor-not-allowed" : ""}
                        `}
                        style={{
                          backgroundImage: bgImage,
                          backgroundSize: "100% 100%",
                          imageRendering: "pixelated"
                        }}
                      >
                        <div className={`
                          transition-opacity drop-shadow-[1.5px_1.5px_0_rgba(0,0,0,0.5)]
                          ${isDone ? "text-white opacity-100" : "text-[#ccc] opacity-80"}
                        `}>
                          {node.icon}
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block z-50 pointer-events-none min-w-[250px] whitespace-nowrap">
                            <div className="bg-[#121212]/95 border-[1px] border-[#000] rounded-sm">
                               <div className={`
                                  px-3 py-2 border-[2px] border-l-white/20 border-t-white/20 border-r-black/30 border-b-black/30 font-minecraft text-[14px]
                                  ${node.type === "challenge" ? "text-[#f4f8f5] bg-[#a800a8]" : isDone ? "text-white bg-[#ba902a]" : "text-[#f4f8f5] bg-[#016997]"}
                               `}
                               style={{ textShadow: '1.5px 1.5px 0 rgba(0,0,0,0.5)' }}>
                                  {node.title} {isLocked && "(Locked)"}
                               </div>
                               <div className="px-3 py-2 border-l-[2px] border-b-[2px] border-r-[2px] border-white/20 font-minecraft text-[12px] text-[#7ae976] whitespace-normal bg-[#222022]">
                                  {node.description}
                               </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Button */}
      <div className="mt-8 w-[400px]">
        <McButton onClick={onBack}>Done</McButton>
      </div>
    </div>
  );
}
