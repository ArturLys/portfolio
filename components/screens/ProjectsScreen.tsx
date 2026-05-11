'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { McButton } from '../MinecraftMenu'

interface Project {
  id: string
  name: string
  description: string
  shortDescription: string
  version: string
  updatedAt: string
  url: string
  repoUrl?: string
  icon: string
  images?: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'chystolys',
    name: 'Chystolys',
    description:
      'Production E-commerce for my dad with private code. Features AI-powered product generation and a custom admin dashboard.',
    shortDescription: 'E-commerce for dad',
    version: 'Next.js 15.1 / Prisma',
    updatedAt: 'May 1, 2026',
    url: 'https://chystolys.com',
    repoUrl: 'https://github.com/ArturLys/chystolys',
    icon: '/worlds/chystolys-icon.png',
    images: ['/worlds/chystolys-home.png', '/worlds/chystolys-dashboard.png'],
  },
  {
    id: 'ai-image-search',
    name: 'AI Image Search',
    description:
      'Semantic vector-based image retrieval using Gemini. Allows for natural language searching through large image datasets.',
    shortDescription: 'Semantic image retrieval',
    version: 'Gemini / Next.js',
    updatedAt: 'April 28, 2026',
    url: 'https://ai-image-search-xi.vercel.app',
    repoUrl: 'https://github.com/ArturLys/ai-image-search',
    icon: '/worlds/image-search-icon.webp',
    images: ['/worlds/image-search-main.png'],
  },
  {
    id: 'forum',
    name: "The Friends' Forum",
    description:
      'My ugly first forum project. A raw dive into community platforms and full-stack basics. Humble beginnings.',
    shortDescription: 'My ugly first forum',
    version: 'Prisma / Clerk / Next.js',
    updatedAt: 'January 12, 2024',
    url: 'https://gooning.fun',
    repoUrl: 'https://github.com/ArturLys/forum',
    icon: '/worlds/forum-icon.png',
    images: ['/worlds/forum-main.png'],
  },
  {
    id: 'tictactoe',
    name: 'Ultimate Tic-Tac-Toe',
    description:
      'Real-time multiplayer ultimate tic-tac-toe game built with WebSockets for instant synchronization between players.',
    shortDescription: 'Real-time multiplayer game',
    version: 'React / Express / Socket.io',
    updatedAt: 'March 15, 2026',
    url: 'https://react-speed-run.vercel.app/tic-tac-toe',
    repoUrl: 'https://github.com/ArturLys/react-speedrun',
    icon: '/worlds/tic-tac-toe-icon.png',
    images: ['/worlds/tic-tac-toe-main.png'],
  },
]

export default function ProjectsScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showDetail, setShowDetail] = useState<Project | null>(null)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const filteredProjects = PROJECTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const handlePlay = () => {
    const project = PROJECTS.find((p) => p.id === selected)
    if (project && project.url !== '#') {
      window.open(project.url, '_blank')
    }
  }

  const handleInfo = () => {
    const project = PROJECTS.find((p) => p.id === selected)
    if (project) {
      setShowDetail(project)
    }
  }

  const handleDoubleClick = (project: Project) => {
    setShowDetail(project)
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center pt-4 bg-black/70">
      {/* World Detail Modal */}
      {showDetail && (
        <div className="absolute inset-0 z-50 flex flex-col items-center pt-8 bg-black/60 backdrop-blur-sm overflow-y-auto scrollbar-mc">
          <h2
            className="font-minecraft text-[16px] text-white mb-10 select-none mt-[5px]"
            style={{ textShadow: '2px 2px 0px #3f3f3f' }}
          >
            Description
          </h2>

          <div className="flex flex-col items-center w-[600px] max-w-[95vw] gap-4 pb-12">
            <div className="w-full">
              <p className="font-minecraft text-[14px] text-[#aaa] mb-1">Project Name</p>
              <div className="w-full h-[40px] bg-black border-[2px] border-[#555] flex items-center px-3 pt-[7px]">
                <span className="font-minecraft text-[16px] text-white">{showDetail.name}</span>
              </div>
            </div>

            <div className="w-full bg-black/40 p-4 min-h-[100px] pt-[17px]">
              <p className="font-minecraft text-[14px] text-[#e0e0e0] leading-relaxed pt-[7px]">
                {showDetail.description}
              </p>
              <p className="font-minecraft text-[12px] text-[#808080] mt-4 pt-[7px]">Stack: {showDetail.version}</p>

              {/* Screenshots - Vertical Stack */}
              <div className="flex flex-col gap-4 w-full mt-6">
                {showDetail.images?.map((img, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#333] border-[2px] border-[#555] relative overflow-hidden cursor-zoom-in group hover:border-white transition-colors"
                    onClick={() => setZoomedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-minecraft text-[12px] text-white [text-shadow:1px_1px_0px_#000]">
                        Click to Zoom
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[6px] w-full mt-4">
              <McButton
                className="w-full h-[40px]"
                disabled={showDetail.url === '#'}
                onClick={() => window.open(showDetail.url, '_blank')}
              >
                Play&nbsp;&nbsp;World
              </McButton>
              <McButton className="w-full h-[40px]" onClick={() => window.open(showDetail.repoUrl, '_blank')}>
                Open&nbsp;&nbsp;Repository
              </McButton>
              <div className="mt-2">
                <McButton className="w-full h-[40px]" onClick={() => setShowDetail(null)}>
                  Cancel
                </McButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showDetail && (
        <>
          <h2
            className="font-minecraft text-[16px] text-white mb-1 select-none whitespace-pre"
            style={{ textShadow: '2px 2px 0px #3f3f3f', WebkitFontSmoothing: 'none' }}
          >
            Select&nbsp;&nbsp;World
          </h2>

          {/* Search Bar */}
          <div className="mb-2 w-[400px] max-w-[95vw] relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full h-[35px] bg-black border-[2px] border-white px-2 font-minecraft text-[16px] text-white outline-none placeholder:text-[#444]"
              style={{ WebkitFontSmoothing: 'none', wordSpacing: '4px', paddingTop: '10px' }}
            />
          </div>
        </>
      )}

      {!showDetail && (
        <>
          {/* World List Container */}
          <div className="flex-1 w-full flex flex-col overflow-hidden relative">
            <div className="h-[2px] bg-black/80 w-full z-20" />
            <div className="h-[2px] bg-black/50 w-full z-20" />

            <div className="flex-1 bg-black/40 overflow-y-auto scrollbar-mc">
              <div className="flex flex-col items-center py-2">
                <div className="w-[700px] max-w-[95vw] flex flex-col">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      onDoubleClick={() => handleDoubleClick(p)}
                      className={`
                        flex gap-3 p-1 border-[2px] cursor-pointer
                        ${selected === p.id ? 'bg-black/60 border-white/80' : 'border-transparent hover:bg-black/30'}
                      `}
                    >
                      <div className="w-[64px] h-[64px] flex-shrink-0 bg-[#333] border-[1px] border-[#555] relative overflow-hidden">
                        <Image
                          src={p.icon}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 leading-tight">
                        <span
                          className="font-minecraft text-[14px] text-white whitespace-nowrap mb-1"
                          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none' }}
                        >
                          {p.name}
                        </span>
                        <span
                          className="font-minecraft text-[14px] text-[#808080] whitespace-nowrap"
                          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none' }}
                        >
                          {p.shortDescription}&nbsp;&nbsp;{p.updatedAt}
                        </span>
                        <span
                          className="font-minecraft text-[16px] text-[#808080] whitespace-nowrap"
                          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none' }}
                        >
                          {p.version}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[2px] bg-black/50 w-full z-20" />
            <div className="h-[2px] bg-black/80 w-full z-20" />
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 pb-6 w-[700px] max-w-[95vw] flex flex-col gap-[4px] relative z-20">
            <div className="flex gap-3 w-full">
              <div className="flex flex-1">
                <McButton className="w-full h-[40px]" disabled={!selected} onClick={handlePlay}>
                  Play&nbsp;&nbsp;Selected&nbsp;&nbsp;World
                </McButton>
              </div>
              <div className="flex flex-1">
                <McButton className="w-full h-[40px]" disabled>
                  Create&nbsp;&nbsp;New&nbsp;&nbsp;World
                </McButton>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <div className="flex gap-[4px] flex-1">
                <McButton className="flex-1 w-auto h-[40px]" disabled={!selected} onClick={handleInfo}>
                  Info
                </McButton>
                <McButton className="flex-1 w-auto h-[40px]" disabled>
                  Delete
                </McButton>
              </div>
              <div className="flex gap-[4px] flex-1">
                <McButton className="flex-1 w-auto h-[40px]" disabled>
                  Re-Create
                </McButton>
                <McButton className="flex-1 w-auto h-[40px]" onClick={onBack}>
                  Back
                </McButton>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Zoomed Image Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 cursor-zoom-out p-2 md:p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={zoomedImage}
                alt="Zoomed screenshot"
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
