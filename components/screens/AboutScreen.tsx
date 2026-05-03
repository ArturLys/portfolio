'use client'

import { McButton } from '../MinecraftMenu'

export default function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center justify-center'>
      <style>{`
        @keyframes hover-vibrate {
          0% { transform: translate(1px, 0) }
          20% { transform: translate(-2px, 0) }
          40% { transform: translate(2px, 0) }
          60% { transform: translate(-1px, 0) }
          80% { transform: translate(-2px, 0) }
          100% { transform: translate(1px, 0) }
        }
        .hover-vibrate:hover {
          animation: hover-vibrate 0.2s ease-in-out 2s infinite;
        }
      `}</style>
      {/* Dirt Background Overlay */}
      <div
        className='fixed inset-0 z-[-1] brightness-[0.25]'
        style={{
          backgroundImage: "url('/textures/ui/dirt.png')",
          backgroundSize: '64px',
          imageRendering: 'pixelated',
        }}
      />

      <h2 className='font-minecraft text-[24px] text-white [text-shadow:2px_2px_0px_#3f3f3f] mb-8 select-none'>About Me</h2>

      {/* Content Box */}
      <div className='w-[600px] max-w-[90vw] flex flex-col items-center gap-8 text-center mt-4'>
        <img
          src='/photo.png'
          alt='Artur'
          className='w-[160px] h-[160px] object-cover border-[4px] border-solid border-t-[#fff] border-l-[#fff] border-r-[#555] border-b-[#555] bg-[#8b8b8b] select-none shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover-vibrate'
          draggable={false}
        />
        <p className='font-minecraft text-[16px] text-[#e0e0e0] leading-[28px] [text-shadow:2px_2px_0px_#222] max-w-[480px] whitespace-pre-wrap'>
          {
            "Hi,  I'm  Artur  -  based  in  Lviv,  Ukraine.  I've  been  coding  for  8  years.  CS  student  at  LNU,  English  C1+.  I  build  full-stack  web  apps  and  AI-powered  tools."
          }
        </p>
      </div>

      {/* Done Button */}
      <div className='mt-12 w-[300px]'>
        <McButton onClick={onBack}>Done</McButton>
      </div>
    </div>
  )
}
