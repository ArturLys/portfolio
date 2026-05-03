'use client'

import { useState, useEffect, useCallback } from 'react'
import { ScreenState } from '@/app/page'

const SPLASH_TEXTS = [
  '10,000 lines of TypeScript!',
  'Codes since age 10!',
  '日本語勉強中！',
  'Also available in Ukrainian!',
  'Full-Stack Engineer!',
  '3rd in Lviv!',
  'Cherry blossoms!',
  'Now with more Next.js!',
  'AI-powered!',
  'Built different!',
]

/** Play the MC click sound. Cached after first load. */
let clickAudio: HTMLAudioElement | null = null
function playClick() {
  if (typeof window === 'undefined') return
  if (!clickAudio) {
    clickAudio = new Audio('/sounds/click.ogg')
    clickAudio.volume = 0.6
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
      {disabled && (
        <div className="absolute inset-[-4px] pointer-events-none bg-[#0a1a2a]/40 mix-blend-multiply" />
      )}
      
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

      <span className='relative z-10 '>{children}</span>
    </button>
  )
}

export default function MinecraftMenu({ onNavigate }: { onNavigate: (s: ScreenState) => void }) {
  const [splash, setSplash] = useState('')

  useEffect(() => {
    setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)])
  }, [])

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

      {/* Splash text */}
      <div className='animate-splash font-minecraft text-[12px] text-yellow-400 [text-shadow:1px_1px_0px_#3f3f00] absolute top-[28%] right-[18%] whitespace-nowrap select-none pointer-events-none z-3'>
        {splash}
      </div>

      {/* Menu */}
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-minecraft text-[36px] text-white [text-shadow:2px_2px_0px_#3f3f3f] tracking-[3px] mb-1 select-none'>ARTUR LYS</h1>
        <p className='font-minecraft text-[8px] text-[#aaa] [text-shadow:1px_1px_0px_#3f3f3f] mb-10 select-none'>Full-Stack Engineer</p>

        <div className='flex flex-col items-center gap-[6px] w-[400px] max-w-[80vw]'>
          <McButton onClick={() => onNavigate('PROJECTS')}>Singleplayer</McButton>
          <McButton onClick={() => onNavigate('CONTACT')}>Multiplayer</McButton>
          <McButton onClick={() => onNavigate('ACHIEVEMENTS')}>Achievements</McButton>

          <div className='h-[12px]' />

          <div className='flex gap-[6px] w-full items-center'>
            <McButton onClick={() => onNavigate('ABOUT')} className='flex-1'>
              About Me
            </McButton>
            <McButton onClick={() => window.open('https://github.com/ArturLys', '_blank')} className='flex-1'>
              GitHub
            </McButton>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className='fixed bottom-1 left-2 font-minecraft text-[8px] text-[#aaa] [text-shadow:1px_1px_0px_#000] z-2 select-none'>
        Artur Lys Portfolio
      </div>
      <div className='fixed bottom-1 right-2 font-minecraft text-[8px] text-[#aaa] [text-shadow:1px_1px_0px_#000] z-2 select-none'>
        Next.js 16 / Three.js
      </div>
    </div>
  )
}
