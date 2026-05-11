'use client'

import { useEffect, useRef } from 'react'

/**
 * All assets to preload in the background after the panorama loads.
 * Icons first (small, needed for world list), then screenshots,
 * then other assets used across screens.
 */
const PRELOAD_ASSETS = [
  // Project icons — small, load first so the world list is instant
  '/worlds/chystolys-icon.png',
  '/worlds/image-search-icon.webp',
  '/worlds/forum-icon.png',
  '/worlds/tic-tac-toe-icon.png',

  // Project screenshots
  '/worlds/chystolys-home.png',
  '/worlds/chystolys-dashboard.png',
  '/worlds/image-search-main.png',
  '/worlds/forum-main.png',
  '/worlds/tic-tac-toe-main.png',

  // About page photo
  '/photo.png',

  // UI textures used as CSS backgroundImage
  '/textures/ui/dirt.png',
  '/textures/ui/stone.png',

  // Local icons used in achievements
  '/icons/prisma.svg',
  '/icons/aws-icon.webp',
]

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject()
    img.src = src
  })
}

async function preloadSequentially(
  assets: string[],
  signal: AbortSignal
): Promise<void> {
  for (const src of assets) {
    if (signal.aborted) return

    await new Promise<void>((resolve) => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => resolve(), { timeout: 2000 })
      } else {
        setTimeout(resolve, 0)
      }
    })

    if (signal.aborted) return

    try {
      await preloadImage(src)
    } catch {
      // Silently skip — will load on demand
    }
  }
}

/**
 * Begins background preloading of all project assets
 * once the panorama has finished loading.
 */
export function usePreloadAssets(isReady: boolean): void {
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isReady || hasStarted.current) return
    hasStarted.current = true

    const controller = new AbortController()

    const timer = setTimeout(() => {
      preloadSequentially(PRELOAD_ASSETS, controller.signal)
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [isReady])
}
