'use client'

import { useState, useRef } from 'react'
import { McButton } from '../MinecraftMenu'
import { Globe, Cpu, Terminal, X, Lock, Server, Database, Cloud, Activity, Braces, Sparkles, Image as ImageIcon, Wrench, Map } from 'lucide-react'

interface AdvancementNode {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  x: number
  y: number
  parent?: string
  locked?: boolean
  type?: 'task' | 'goal' | 'challenge'
}

const WEB_ADVANCEMENTS: AdvancementNode[] = [
  { id: 'html', title: 'The Foundation', description: 'HTML/CSS/JS/TS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 40, y: 128 },
  { id: 'react', title: 'Reactive Power', description: 'Modern React Development', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 104, y: 128, parent: 'html' },
  { id: 'nextjs', title: 'The Next Level', description: 'Next.js App Router & SSR', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" className="w-[28px] h-[28px] invert object-contain select-none" draggable={false} />, x: 168, y: 128, parent: 'react' },
  { id: 'node', title: 'Backend Engine', description: 'Node / Express / WebSockets', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 232, y: 64, parent: 'nextjs' },
  { id: 'prisma', title: 'Data Smith', description: 'Prisma & PostgreSQL', icon: <img src="/icons/prisma.svg" className="w-[28px] h-[28px] invert object-contain select-none" draggable={false} />, x: 232, y: 192, parent: 'nextjs' },
]

const INFRA_ADVANCEMENTS: AdvancementNode[] = [
  { id: 'git', title: 'Timeline Control', description: 'Git Version Control', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 40, y: 128 },
  { id: 'linux', title: 'Kernel Access', description: 'Linux Systems & Bash', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 104, y: 128, parent: 'git' },
  { id: 'ssh', title: 'Secure Shell', description: 'Remote Server Management', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 168, y: 128, parent: 'linux' },
  { id: 'aws', title: 'The Cloud', description: 'AWS EC2 / S3', icon: <img src="/icons/aws-icon.webp" className="w-[28px] h-[28px] object-contain rounded-[4px] select-none" draggable={false} />, x: 232, y: 128, parent: 'ssh' },
  { id: 'docker', title: 'Contained', description: 'Docker & Containerization', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 296, y: 128, parent: 'aws' },
  { id: 'cicd', title: 'Continuous Delivery', description: 'CI/CD Pipelines', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 360, y: 128, parent: 'docker', locked: true },
]

const AI_ADVANCEMENTS: AdvancementNode[] = [
  { id: 'prompt', title: 'Whisperer', description: 'Advanced Prompt Design', icon: <img src="https://api.iconify.design/simple-icons:openai.svg?color=white" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 40, y: 128 },
  { id: 'llm', title: 'Silicon Mind', description: 'LLM Integration', icon: <img src="https://api.iconify.design/simple-icons:anthropic.svg?color=white" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 104, y: 128, parent: 'prompt' },
  { id: 'rag', title: 'Living Knowledge', description: 'RAG Pipelines', icon: <img src="https://api.iconify.design/carbon:network-4.svg?color=white" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 168, y: 64, parent: 'llm' },
  { id: 'agents', title: 'Autonomous Units', description: 'Agentic AI Frameworks', icon: <img src="https://api.iconify.design/simple-icons:langchain.svg?color=white" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 232, y: 64, parent: 'rag', type: 'challenge' },
  { id: 'vector', title: 'Semantic Search', description: 'Vector Databases', icon: <img src="https://api.iconify.design/logos:chroma.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 168, y: 0, parent: 'rag', locked: true },
  { id: 'lora', title: 'Fine-Tuner', description: 'LoRA Training', icon: <img src="https://api.iconify.design/simple-icons:huggingface.svg?color=white" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 168, y: 192, parent: 'llm' },
  { id: 'mcp', title: 'Tool Maker', description: 'MCP Development', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-[28px] h-[28px] object-contain select-none" draggable={false} />, x: 104, y: 192, parent: 'prompt' },
]

const TABS = [
  { id: 'WEB', title: 'Web', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-[24px] h-[24px] object-contain select-none" draggable={false} /> },
  { id: 'INFRA', title: 'Infrastructure', icon: <img src="/icons/aws-icon.webp" className="w-[24px] h-[24px] object-contain rounded-[4px] select-none" draggable={false} /> },
  { id: 'AI', title: 'AI  /  ML', icon: <img src="https://api.iconify.design/simple-icons:openai.svg?color=white" className="w-[24px] h-[24px] object-contain select-none" draggable={false} /> },
] as const

export default function AdvancementsScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'WEB' | 'INFRA' | 'AI'>('WEB')
  const [hoveredTooltip, setHoveredTooltip] = useState<{ node: AdvancementNode; x: number; y: number } | null>(null)
  const mainPanelRef = useRef<HTMLDivElement>(null)

  const nodes = activeTab === 'WEB' ? WEB_ADVANCEMENTS : activeTab === 'INFRA' ? INFRA_ADVANCEMENTS : AI_ADVANCEMENTS

  const maxX = Math.max(...nodes.map((n) => n.x)) + 52
  const maxY = Math.max(...nodes.map((n) => n.y)) + 52

  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm'>
      {/* Global Title above window */}
      <h1 className='font-minecraft text-[16px] text-[#aaa] mb-8 select-none whitespace-pre' style={{ textShadow: '2px 2px 0px #000' }}>
        Advancements
      </h1>

      {/* Advancements Window Container */}
      <div className='relative w-[850px] h-[580px] max-w-[95vw] max-h-[90vh] flex flex-col antialiased'>
        {/* Tabs Row */}
        <div className='flex gap-[2px] ml-[15px] relative z-40'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 flex items-center justify-center border-[2px] border-solid rounded-t-[4px]
                transition-none relative
                ${
                  activeTab === tab.id
                    ? 'bg-[#c6c6c6] border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-0 text-[#3f3f3f] pt-2 pb-[12px] mb-[-2px] z-50'
                    : 'bg-[#8b8b8b] border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-[#555555] text-white hover:bg-[#a0a0a0] py-2 mt-1 z-10'
                }
              `}
            >
              <div className='transform -translate-y-[2px]'>{tab.icon}</div>
            </button>
          ))}
        </div>

        {/* Main Panel */}
        <div
          ref={mainPanelRef}
          className='flex-1 bg-[#c6c6c6] border-[2px] border-solid border-t-[#ffffff] border-l-[#ffffff] border-r-[#555555] border-b-[#555555] rounded-[4px] p-5 flex flex-col relative z-20'
        >
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-minecraft text-[18px] text-[#3f3f3f] ml-1 select-none whitespace-pre'>
              {TABS.find((t) => t.id === activeTab)?.title}
            </h2>
          </div>

          {/* Scrolling Canvas Container */}
          <div className='flex-1 relative bg-[#222] border-[2px] border-solid border-t-[#555555] border-l-[#555555] border-r-[#ffffff] border-b-[#ffffff] overflow-hidden'>
            {/* Dynamic Tiling Background */}
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: activeTab === 'INFRA' ? "url('/textures/ui/dirt.png')" : "url('/textures/ui/stone.png')",
                backgroundSize: '64px',
                imageRendering: 'pixelated',
                boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)',
                filter: activeTab === 'AI' ? 'brightness(0.35) contrast(1.2)' : 'none',
              }}
            />

            {/* Draggable Area - Scrollbars Hidden */}
            <div
              className='absolute inset-0 overflow-auto scrollbar-none p-10'
              onScroll={() => setHoveredTooltip(null)} // Hide tooltip when scrolling
            >
              <div
                className='relative'
                style={{
                  width: `${maxX + 66}px`, // ~100px buffer when scaled by 1.5
                  height: `${Math.max(maxY + 66, 260)}px`, // Ensure some minimum height
                  transform: 'scale(1.5)',
                  transformOrigin: 'top left',
                }}
              >
                {/* 1. Draw Black Bases for Connection Lines */}
                {nodes.map((node) => {
                  if (!node.parent) return null
                  const parent = nodes.find((n) => n.id === node.parent)
                  if (!parent) return null

                  const startX = parent.x + 26
                  const startY = parent.y + 26
                  const endX = node.x + 26
                  const endY = node.y + 26

                  const isHorizontal = startY === endY

                  return (
                    <div key={`line-base-${node.id}`} className='absolute z-0'>
                      {isHorizontal ? (
                        <div className='absolute bg-black' style={{ left: startX - 3, top: startY - 3, width: endX - startX + 6, height: 6 }} />
                      ) : (
                        <>
                          {/* Horizontal to Midpoint */}
                          <div
                            className='absolute bg-black'
                            style={{ left: startX - 3, top: startY - 3, width: (endX - startX) / 2 + 6, height: 6 }}
                          />
                          {/* Vertical Drop */}
                          <div
                            className='absolute bg-black'
                            style={{
                              left: startX + (endX - startX) / 2 - 3,
                              top: Math.min(startY, endY) - 3,
                              width: 6,
                              height: Math.abs(endY - startY) + 6,
                            }}
                          />
                          {/* Horizontal from Midpoint to Child */}
                          <div
                            className='absolute bg-black'
                            style={{ left: startX + (endX - startX) / 2 - 3, top: endY - 3, width: (endX - startX) / 2 + 6, height: 6 }}
                          />
                        </>
                      )}
                    </div>
                  )
                })}

                {/* 2. Draw White Cores for Connection Lines */}
                {nodes.map((node) => {
                  if (!node.parent) return null
                  const parent = nodes.find((n) => n.id === node.parent)
                  if (!parent) return null

                  const startX = parent.x + 26
                  const startY = parent.y + 26
                  const endX = node.x + 26
                  const endY = node.y + 26

                  const isHorizontal = startY === endY

                  return (
                    <div key={`line-core-${node.id}`} className='absolute z-10'>
                      {isHorizontal ? (
                        <div className='absolute bg-white' style={{ left: startX - 1, top: startY - 1, width: endX - startX + 2, height: 2 }} />
                      ) : (
                        <>
                          <div
                            className='absolute bg-white'
                            style={{ left: startX - 1, top: startY - 1, width: (endX - startX) / 2 + 2, height: 2 }}
                          />
                          <div
                            className='absolute bg-white'
                            style={{
                              left: startX + (endX - startX) / 2 - 1,
                              top: Math.min(startY, endY) - 1,
                              width: 2,
                              height: Math.abs(endY - startY) + 2,
                            }}
                          />
                          <div
                            className='absolute bg-white'
                            style={{ left: startX + (endX - startX) / 2 - 1, top: endY - 1, width: (endX - startX) / 2 + 2, height: 2 }}
                          />
                        </>
                      )}
                    </div>
                  )
                })}

                {/* 3. Draw Nodes */}
                {nodes.map((node) => {
                  const bgImage =
                    node.type === 'challenge'
                      ? node.locked
                        ? "url('/textures/ui/challenge.webp')"
                        : "url('/textures/ui/challenge_completed.webp')"
                      : node.locked
                        ? "url('/textures/ui/advancement.png')"
                        : "url('/textures/ui/advancement_completed.png')"

                  return (
                    <div
                      key={node.id}
                      className={`absolute hover:z-[100] ${hoveredTooltip?.node.id === node.id ? 'z-[100]' : 'z-20'}`}
                      style={{ left: node.x, top: node.y }}
                    >
                      {/* Node Icon */}
                      <div
                        className='w-[52px] h-[52px] flex items-center justify-center relative z-10 select-none pointer-events-auto cursor-pointer'
                        style={{
                          backgroundImage: bgImage,
                          backgroundSize: '100% 100%',
                          imageRendering: 'pixelated',
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setHoveredTooltip({
                            node,
                            x: rect.left,
                            y: rect.top,
                          })
                        }}
                        onMouseLeave={() => setHoveredTooltip(null)}
                      >
                        <div className='text-white drop-shadow-[1.5px_1.5px_0_rgba(0,0,0,0.5)] transform -translate-y-[2px]'>{node.icon}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Tooltip - Fixed portal-like rendering to escape overflow and handle z-layering */}
          {hoveredTooltip && (
            <div
              className='fixed z-[9999] pointer-events-none font-minecraft'
              style={{
                left: hoveredTooltip.x,
                top: hoveredTooltip.y,
                transform: 'scale(1.5)',
                transformOrigin: 'top left',
              }}
            >
              {/* Tooltip Background/Text Box */}
              <div
                style={{
                  position: 'absolute',
                  left: -5,
                  top: 8,
                  color: '#fff9d4',
                  fontSize: '12px',
                  padding: 0,
                  borderRadius: '4px',
                  border: '1px solid black',
                  whiteSpace: 'normal',
                  width: 'max-content',
                  maxWidth: '250px',
                  background: 'rgba(18, 18, 18, 0.9)',
                  userSelect: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Title */}
                <div
                  style={{
                    backgroundColor: hoveredTooltip.node.locked ? '#016997' : 'rgb(186, 144, 42)',
                    color: '#f4f8f5',
                    padding: '6px',
                    borderTop: '2px solid rgba(255, 255, 255, 0.2)',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                    borderRight: '2px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '4px',
                    paddingLeft: '56px',
                    margin: 0,
                    textShadow: '1.5px 1.5px 0 rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '34px',
                  }}
                >
                  <div style={{ transform: 'translateY(10px)' }}>{hoveredTooltip.node.title}</div>
                </div>

                {/* Description */}
                <div
                  style={{
                    color: hoveredTooltip.node.type === 'challenge' ? '#a800a8' : '#7ae976',
                    backgroundColor: 'rgba(34, 32, 34, 255)',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRight: '2px solid rgba(255, 255, 255, 0.2)',
                    padding: '6px',
                    paddingTop: '14px',
                    paddingBottom: '3px',
                    borderRadius: '0 0 4px 4px',
                    margin: 0,
                  }}
                >
                  {hoveredTooltip.node.description}
                </div>
              </div>

              {/* Ghost Node - Cloned icon that sits on top of the tooltip background */}
              <div
                className='absolute select-none'
                style={{
                  left: 0,
                  top: 0,
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage:
                    hoveredTooltip.node.type === 'challenge'
                      ? hoveredTooltip.node.locked
                        ? "url('/textures/ui/challenge.webp')"
                        : "url('/textures/ui/challenge_completed.webp')"
                      : hoveredTooltip.node.locked
                        ? "url('/textures/ui/advancement.png')"
                        : "url('/textures/ui/advancement_completed.png')",
                  backgroundSize: '100% 100%',
                  imageRendering: 'pixelated',
                }}
              >
                <div className='text-white drop-shadow-[1.5px_1.5px_0_rgba(0,0,0,0.5)] transform -translate-y-[2px]'>{hoveredTooltip.node.icon}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className='mt-8 w-[400px]'>
        <McButton onClick={onBack}>Done</McButton>
      </div>
    </div>
  )
}
