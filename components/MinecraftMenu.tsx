'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SPLASH_TEXTS = [
  '10,000 lines of TypeScript!',
  'Codes since age 10!',
  'Also available in Ukrainian!',
  'Full-Stack Engineer!',
  'Olympiad 3rd place!',
  'Now with more Next.js!',
  'AI-powered!',
]

/** Play the MC click sound. Cached after first load. */
let clickAudio: HTMLAudioElement | null = null
function playClick() {
  if (typeof window === 'undefined') return
  if (!clickAudio) {
    clickAudio = new Audio('/sounds/click.ogg')
    clickAudio.volume = 0.1
  }
  clickAudio.currentTime = 0
  clickAudio.play().catch(() => {})
}

export function McButton({
  children,
  onClick,
  disabled,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  const handleClick = useCallback(() => {
    if (disabled) return
    playClick()
    onClick?.()
  }, [disabled, onClick])

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        font-minecraft text-[14px] leading-[40px]
        w-full h-[40px] select-none text-center
        transition-none relative
        ${
          disabled
            ? 'cursor-not-allowed text-[#707070] [text-shadow:1.7px_1.7px_0px_#3a3a3a] pointer-events-none'
            : 'group text-[#e0e0e0] [text-shadow:1.7px_1.7px_0px_#333333]'
        }
        ${className}
      `}
      style={{
        borderStyle: 'solid',
        borderWidth: '4px',
        borderImageSource: disabled ? "url('/textures/ui/button_disabled.png')" : "url('/textures/ui/button.png')",
        borderImageSlice: '2 2 2 2 fill',
        borderImageRepeat: 'stretch',
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
      }}
    >
      {/* Dark blue tint overlay for disabled buttons */}
      {disabled && <div className='absolute inset-[-4px] pointer-events-none bg-[#0a1a2a]/40 mix-blend-multiply' />}

      {/* Hover overlay — only shows for non-disabled via group-hover (group class only added when not disabled) */}
      <div
        className='absolute inset-[-4px] pointer-events-none hidden group-hover:block'
        style={{
          borderStyle: 'solid',
          borderWidth: '4px',
          borderImageSource: "url('/textures/ui/button_highlighted.png')",
          borderImageSlice: '2 2 2 2 fill',
          borderImageRepeat: 'stretch',
          imageRendering: 'pixelated',
        }}
      />

      <span className='relative z-10 block w-full h-full'>{children}</span>
    </button>
  )
}

export default function MinecraftMenu() {
  const router = useRouter()
  const [splash, setSplash] = useState('')

  useEffect(() => {
    setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)])

    router.prefetch('/projects')
    router.prefetch('/contact')
    router.prefetch('/achievements')
    router.prefetch('/about')
  }, [router])

  return (
    <div className='absolute inset-0 z-10 flex flex-col items-center justify-center'>
      {/* Dark gradient overlay */}
      <div
        className='fixed inset-0 z-[-1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)',
        }}
      />

      {/* Menu */}
      <div className='flex flex-col items-center justify-center relative'>
        {/* Title Area */}
        <div className='relative flex justify-center mt-[-200px] mb-[100px] w-[500px] max-w-[90vw]'>
          <img
            src='/title.png'
            alt='ARTUR LYS'
            className='w-full h-auto select-none drop-shadow-[4px_4px_0_rgba(17,17,17,1)]'
            draggable={false}
            style={{ imageRendering: 'pixelated' }}
          />
          {/* Splash text */}
          <div className='animate-splash font-minecraft text-[16px] text-[#ffff00] [text-shadow:2px_2px_0px_#3f3f00] absolute bottom-[-10px] right-[-20px] whitespace-nowrap select-none pointer-events-none z-30'>
            {splash}
          </div>
        </div>

        <div className='flex flex-col items-center gap-[6px] w-[400px] max-w-[80vw]'>
          <McButton onClick={() => router.push('/projects')}>
            Singleplayer
            <span className='absolute bottom-[2px] right-[6px] text-[10px] text-[#ddd] leading-none [text-shadow:1px_1px_0px_#222] font-sans opacity-50'>
              (projects)
            </span>
          </McButton>
          <McButton onClick={() => router.push('/contact')}>
            Multiplayer
            <span className='absolute bottom-[2px] right-[6px] text-[10px] text-[#ddd] leading-none [text-shadow:1px_1px_0px_#222] font-sans opacity-50'>
              (contacts)
            </span>
          </McButton>
          <McButton onClick={() => router.push('/achievements')}>Advancements</McButton>

          <div className='h-[12px]' />

          <div className='flex gap-[6px] w-full items-center'>
            <McButton onClick={() => router.push('/about')} className='flex-1'>
              About&nbsp;&nbsp;Me
            </McButton>
            <McButton onClick={() => window.open('https://github.com/ArturLys/portfolio/', '_blank')} className='flex-1'>
              GitHub
            </McButton>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className='fixed bottom-0 left-1 font-minecraft text-[10px] text-[#aaa] [text-shadow:1px_1px_0px_#000] z-20 select-none whitespace-pre'>
        Artur Lys Portfolio
      </div>
      <div className='fixed bottom-0 right-1 font-minecraft text-[10px] text-[#aaa] [text-shadow:1px_1px_0px_#000] z-20 select-none whitespace-pre'>
        Next.js 16 / Three.js
      </div>
    </div>
  )
}
