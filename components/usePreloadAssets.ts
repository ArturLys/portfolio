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
 * Injects <link rel="prefetch"> tags into the document head.
 * The browser will download these at low priority in the background
 * without blocking anything. Works reliably on all browsers and Vercel.
 */
function injectPrefetchLinks(assets: string[]): HTMLLinkElement[] {
  const links: HTMLLinkElement[] = []

  for (const src of assets) {
    // Skip if already prefetched
    if (document.querySelector(`link[rel="prefetch"][href="${src}"]`)) continue

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
    links.push(link)
  }

  return links
}

/**
 * Hook that injects prefetch hints for all project assets
 * once the panorama has finished loading.
 */
export function usePreloadAssets(isReady: boolean): void {
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isReady || hasStarted.current) return
    hasStarted.current = true

    // Small delay so the loading screen fade-out settles first
    const timer = setTimeout(() => {
      const links = injectPrefetchLinks(PREFETCH_ASSETS)

      // Cleanup on unmount (shouldn't happen, but good practice)
      return () => {
        links.forEach((link) => link.remove())
      }
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [isReady])
}
