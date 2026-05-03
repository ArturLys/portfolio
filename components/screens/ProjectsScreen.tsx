'use client'

import { useState } from 'react'
import { McButton } from '../MinecraftMenu'

interface Project {
  id: string
  name: string
  description: string
  version: string
  updatedAt: string
  url: string
  gameMode?: string
}

const PROJECTS: Project[] = [
  {
    id: 'chistolis',
    name: 'Chistolis Skateshop',
    description: 'Production E-commerce with AI generation',
    version: 'Next.js 15.1 / Prisma',
    updatedAt: 'May 1, 2026',
    url: 'https://chistolis.arturlys.com',
    gameMode: 'Survival Mode',
  },
  {
    id: 'ai-image-search',
    name: 'AI Image Search',
    description: 'Semantic vector-based image retrieval',
    version: 'Gemini / Next.js / Pinecone',
    updatedAt: 'April 28, 2026',
    url: 'https://images.arturlys.com',
    gameMode: 'Creative Mode',
  },
  {
    id: 'ai-rpg',
    name: 'Legend of AI',
    description: 'Endless AI-generated RPG world',
    version: 'Three.js / OpenAI / Node',
    updatedAt: 'April 15, 2026',
    url: 'https://ai-rpg.arturlys.com',
    gameMode: 'Adventure Mode',
  },
  {
    id: 'portfolio',
    name: 'Portfolio 2026',
    description: 'Gamified Engine — The current world',
    version: 'Next.js 16 / Three.js',
    updatedAt: 'May 3, 2026',
    url: '#',
    gameMode: 'Hardcore Mode',
  },
]

export default function ProjectsScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filteredProjects = PROJECTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const handlePlay = () => {
    const project = PROJECTS.find((p) => p.id === selected)
    if (project && project.url !== '#') {
      window.open(project.url, '_blank')
    }
  }

  const handleDoubleClick = (url: string) => {
    if (url !== '#') {
      window.open(url, '_blank')
    }
  }

  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center pt-4 bg-black/70'>
      <h2
        className='font-minecraft text-[16px] text-white mb-1 select-none whitespace-pre'
        style={{ textShadow: '2px 2px 0px #3f3f3f', WebkitFontSmoothing: 'none' }}
      >
        Select&nbsp;&nbsp;World
      </h2>

      {/* Search Bar - Just the inside white border */}
      <div className='mb-2 w-[400px] max-w-[95vw] relative'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full h-[35px] bg-black border-[2px] border-white px-2 font-minecraft text-[16px] text-white outline-none'
          style={{ WebkitFontSmoothing: 'none', wordSpacing: '4px', paddingTop: '10px' }}
        />
      </div>

      {/* World List Container */}
      <div className='flex-1 w-full flex flex-col overflow-hidden relative'>
        {/* Separator lines above list */}
        <div className='h-[2px] bg-black/80 w-full z-20' />
        <div className='h-[2px] bg-black/50 w-full z-20' />

        {/* Scrollable world list area */}
        <div className='flex-1 bg-black/40 overflow-y-auto scrollbar-mc'>
          <div className='flex flex-col items-center py-2'>
            <div className='w-[700px] max-w-[95vw] flex flex-col'>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  onDoubleClick={() => handleDoubleClick(p.url)}
                  className={`
                    flex gap-3 p-1 border-[2px]
                    ${selected === p.id ? 'bg-black/60 border-white/80' : 'border-transparent hover:bg-black/30'}
                  `}
                >
                  {/* World thumbnail */}
                  <div
                    className='w-[64px] h-[64px] flex-shrink-0 bg-[#333]'
                    style={{
                      backgroundImage: "url('/textures/ui/stone.png')",
                      backgroundSize: 'cover',
                      imageRendering: 'pixelated',
                    }}
                  />
                  <div className='flex flex-col justify-center min-w-0 leading-tight'>
                    <span
                      className='font-minecraft text-[14px] text-white whitespace-nowrap mb-1'
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                    >
                      {p.name}
                    </span>
                    <span
                      className='font-minecraft text-[14px] text-[#808080] whitespace-nowrap'
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                    >
                      {p.name} ({p.updatedAt})
                    </span>
                    <span
                      className='font-minecraft text-[14px] text-[#808080] whitespace-nowrap'
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                    >
                      {p.gameMode}, Version: {p.version}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Separator lines below list */}
        <div className='h-[2px] bg-black/50 w-full z-20' />
        <div className='h-[2px] bg-black/80 w-full z-20' />
      </div>

      {/* Bottom Controls - Exact Minecraft Layout with Center Gap */}
      <div className='pt-4 pb-6 w-[700px] max-w-[95vw] flex flex-col gap-[4px] relative z-20'>
        <div className='flex gap-4 w-full'>
          <div className='flex flex-1'>
            <McButton className='w-full h-[40px]' disabled={!selected} onClick={handlePlay}>
              Play&nbsp;&nbsp;Selected&nbsp;&nbsp;World
              <span className='absolute bottom-[-4px] right-[6px] text-[10px] text-[#aaaaaa] leading-none [text-shadow:1px_1px_0px_#222] font-sans opacity-40'>
                (more info)
              </span>
            </McButton>
          </div>
          <div className='flex flex-1'>
            <McButton className='w-full h-[40px]' disabled>
              Create&nbsp;&nbsp;New&nbsp;&nbsp;World
            </McButton>
          </div>
        </div>
        <div className='flex gap-4 w-full'>
          <div className='flex gap-[4px] flex-1'>
            <McButton className='flex-1 w-auto h-[40px]' disabled>
              Edit
            </McButton>
            <McButton className='flex-1 w-auto h-[40px]' disabled>
              Delete
            </McButton>
          </div>
          <div className='flex gap-[4px] flex-1'>
            <McButton className='flex-1 w-auto h-[40px]' disabled>
              Re-Create
            </McButton>
            <McButton className='flex-1 w-auto h-[40px]' onClick={onBack}>
              Back
            </McButton>
          </div>
        </div>
      </div>
    </div>
  )
}
