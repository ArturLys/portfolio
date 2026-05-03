'use client'

import { useState, useEffect } from 'react'
import { McButton } from '../MinecraftMenu'
import { Mail, Globe, Send } from 'lucide-react'

interface Server {
  id: string
  name: string
  address: string
  icon: React.ReactNode
  ping: string
  url: string
  motd?: string
  status?: string
}

const SERVERS: Server[] = [
  {
    id: 'email',
    name: 'Primary Mail',
    address: 'arturlys.dev@gmail.com',
    icon: <Mail size={32} />,
    ping: '24ms',
    url: 'mailto:arturlys.dev@gmail.com',
    motd: 'Contact me directly',
    status: 'Online',
  },
  {
    id: 'telegram',
    name: 'Telegram DM',
    address: '@ArturLys',
    icon: <Send size={32} />,
    ping: '12ms',
    url: 'https://t.me/ArturLys',
    motd: 'Fastest response time',
    status: 'Online',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Network',
    address: 'Artur Lys',
    icon: <Globe size={32} />,
    ping: '45ms',
    url: 'https://linkedin.com/in/ArturLys',
    motd: 'Professional connections',
    status: 'Online',
  },
  {
    id: 'github',
    name: 'GitHub Profile',
    address: 'github.com/ArturLys',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
        <path d='M9 18c-4.51 2-5-2-7-2' />
      </svg>
    ),
    ping: '5ms',
    url: 'https://github.com/ArturLys',
    motd: 'Open source contributions',
    status: 'Online',
  },
]

const SCAN_STATES = ['O o o', 'o O o', 'o o O', 'o O o']

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [scanStateIndex, setScanStateIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanStateIndex((prev) => (prev + 1) % SCAN_STATES.length)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const handleJoin = () => {
    const server = SERVERS.find((s) => s.id === selected)
    if (server) {
      window.open(server.url, '_blank')
    }
  }

  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center pt-4 bg-black/70'>
      <h2
        className='font-minecraft text-[16px] text-white mb-2 select-none whitespace-pre'
        style={{ textShadow: '2px 2px 0px #3f3f3f', WebkitFontSmoothing: 'none' }}
      >
        Play&nbsp;&nbsp;Multiplayer
      </h2>

      {/* Server List Container */}
      <div className='flex-1 w-full flex flex-col overflow-hidden relative mt-4'>
        {/* Separator lines above list */}
        <div className='h-[2px] bg-black/80 w-full z-20' />
        <div className='h-[2px] bg-black/50 w-full z-20' />

        {/* Scrollable server list area */}
        <div className='flex-1 bg-black/40 overflow-y-auto scrollbar-mc'>
          <div className='flex flex-col items-center py-2'>
            <div className='w-[700px] max-w-[95vw] flex flex-col'>
              {SERVERS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  onDoubleClick={() => {
                    setSelected(s.id)
                    window.open(s.url, '_blank')
                  }}
                  className={`
                    flex gap-3 p-1 border-[2px] cursor-pointer
                    ${selected === s.id ? 'bg-black/60 border-white/80' : 'border-transparent hover:bg-black/30'}
                  `}
                >
                  {/* Server icon */}
                  <div className='w-[64px] h-[64px] flex-shrink-0 bg-[#333] flex items-center justify-center border-[2px] border-black'>
                    <div className='text-white'>{s.icon}</div>
                  </div>
                  <div className='flex flex-col justify-center min-w-0 leading-tight flex-1'>
                    <div className='flex justify-between items-center mb-1 mt-1'>
                      <span
                        className='font-minecraft text-[14px] text-white whitespace-nowrap'
                        style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span
                      className='font-minecraft text-[14px] text-[#808080] whitespace-nowrap'
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                    >
                      {s.motd}
                    </span>
                    <span
                      className='font-minecraft text-[14px] text-[#808080] whitespace-nowrap'
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
                    >
                      {s.address}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scanning text */}
            <div className='mt-6 text-center'>
              <span
                className='font-minecraft text-[14px] text-white select-none block whitespace-pre'
                style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '2px' }}
              >
                Scanning for games on your local network
              </span>
              <span
                className='font-minecraft text-[14px] text-[#808080] select-none block mt-[1px]'
                style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)', WebkitFontSmoothing: 'none', wordSpacing: '4px' }}
              >
                {SCAN_STATES[scanStateIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Separator lines below list */}
        <div className='h-[2px] bg-black/50 w-full z-20' />
        <div className='h-[2px] bg-black/80 w-full z-20' />
      </div>

      {/* Bottom Controls */}
      <div className='pt-4 pb-6 w-[700px] max-w-[95vw] flex flex-col gap-[5px] relative z-20'>
        {/* Row 1: Join Server, Direct Connection, Add Server */}
        <div className='flex gap-[5px] w-full'>
          <McButton className='flex-1 w-auto h-[40px]' disabled={!selected} onClick={handleJoin}>
            Join&nbsp;&nbsp;Server
          </McButton>
          <McButton className='flex-1 w-auto h-[40px]' disabled>
            Direct&nbsp;&nbsp;Connection
          </McButton>
          <McButton className='flex-1 w-auto h-[40px]' disabled>
            Add&nbsp;&nbsp;Server
          </McButton>
        </div>

        {/* Row 2: Edit, Delete, Refresh, Back */}
        <div className='flex gap-[5px] w-full'>
          <McButton className='flex-1 w-auto h-[40px]' disabled>
            Edit
          </McButton>
          <McButton className='flex-1 w-auto h-[40px]' disabled>
            Delete
          </McButton>
          <McButton className='flex-1 w-auto h-[40px]' disabled>
            Refresh
          </McButton>
          <McButton className='flex-1 w-auto h-[40px]' onClick={onBack}>
            Back
          </McButton>
        </div>
      </div>
    </div>
  )
}
