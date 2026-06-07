'use client'

import { useEffect, useRef } from 'react'

/**
 * All assets to prefetch in the background after the panorama loads.
 * Icons first (small), then screenshots (large).
 */
const PREFETCH_ASSETS = [
  // UI textures
  '/textures/ui/button.png',
  '/textures/ui/button_highlighted.png',
  '/textures/ui/button_disabled.png',
  '/textures/ui/dirt.png',
  '/textures/ui/stone.png',
  '/textures/ui/advancement.png',
  '/textures/ui/advancement_completed.png',
  '/textures/ui/challenge.webp',
  '/textures/ui/challenge_completed.webp',

  // Project icons
  '/worlds/chystolys-icon.png',
  '/worlds/image-search-icon.webp',
  '/worlds/forum-icon.png',
  '/worlds/tic-tac-toe-icon.png',
  '/worlds/ai-rpg-icon.png',

  // Project screenshots & example images
  '/worlds/chystolys-home.png',
  '/worlds/chystolys-dashboard.png',
  '/worlds/image-search-main.png',
  '/worlds/forum-main.png',
  '/worlds/tic-tac-toe-main.png',
  '/worlds/ai-rpg-main.png',
  '/worlds/ai-rpg-character-example.png',

  // About page photo
  '/photo.png',

  // Local icons used in achievements
  '/icons/prisma.svg',
  '/icons/aws-icon.webp',
  '/icons/openai.svg',
  '/icons/anthropic.svg',
  '/icons/langchain.svg',
  '/icons/huggingface.svg',
  '/icons/chroma.svg',
  '/icons/chromadb.svg',
  '/icons/pinecone.svg',

  // Audio assets
  '/sounds/click.ogg',
]

/**
 * Prefetches all assets in the background using JavaScript constructors.
 * Handles images, SVGs, and audio files appropriately to guarantee browser caching.
 */
function preloadAllAssets(assets: string[]): void {
  if (typeof window === 'undefined') return
  for (const src of assets) {
    if (src.endsWith('.ogg') || src.endsWith('.mp3') || src.endsWith('.wav')) {
      const audio = new window.Audio()
      audio.src = src
    } else {
      const img = new window.Image()
      img.src = src
    }
  }
}

export function usePreloadAssets(isReady: boolean): void {
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isReady || hasStarted.current) return
    hasStarted.current = true

    const timer = setTimeout(() => {
      preloadAllAssets(PREFETCH_ASSETS)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [isReady])
}

// Keep the function exported as a no-op to avoid breaking imports in other files
export function prefetchAssetsForRoute(route: string): void {
  // No-op: we now preload everything on mount
}
