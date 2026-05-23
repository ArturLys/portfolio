'use client'

import { motion } from 'framer-motion'
import { McButton } from '../MinecraftMenu'

export function ComingSoonScreen({ onBack }: { onBack?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='flex flex-col items-center justify-center min-h-screen gap-8 px-4'
    >
      {/* Title */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className='text-center'>
        <h1 className='text-5xl font-minecraft text-[#ffff00] mb-4 [text-shadow:3px_3px_0px_#3a3a3a]'>Coming Soon</h1>
        <p className='text-xl font-minecraft text-[#e0e0e0] [text-shadow:1.7px_1.7px_0px_#333333]'>More content is being crafted...</p>
      </motion.div>

      {/* Minecraft-style box */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className='border-4 border-[#8b8b8b] bg-[#c0c0c0] p-8 max-w-md w-full'
      >
        <p className='font-minecraft text-center text-[#000000] mb-4'>Check back soon for updates!</p>
      </motion.div>

      {/* Back button */}
      {onBack && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className='w-48'>
          <McButton onClick={onBack}>← Back</McButton>
        </motion.div>
      )}
    </motion.div>
  )
}
