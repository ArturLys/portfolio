'use client'

import { useEffect, useRef } from 'react'

/**
 * All assets to prefetch in the background after the panorama loads.
 * Icons first (small), then screenshots (large).
 */
const PREFETCH_ASSETS = [
  // Project icons
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

/**
 * Prefetches all assets in the background using JavaScript's Image constructor.
 * This guarantees the browser caches the full file data and avoids Vercel's
 * empty-body prefetch behavior.
 */
function preloadAllAssets(assets: string[]): void {
  if (typeof window === 'undefined') return
  for (const src of assets) {
    const img = new window.Image()
    img.src = src
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
