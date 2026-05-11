'use client'

import { useEffect, useRef } from 'react'

/**
 * List of all assets to preload in the background after the panorama loads.
 * Ordered by priority: icons first (small, needed for the world list),
 * then screenshots (larger, needed for detail views).
 */
const PRELOAD_ASSETS = [
  // Project icons — small, load first so the world list is instant
  '/worlds/chystolys-icon.png',
  '/worlds/image-search-icon.webp',
  '/worlds/forum-icon.png',
  '/worlds/tic-tac-toe-icon.png',

  // Project screenshots — larger, but preloaded so info view is instant
  '/worlds/chystolys-home.png',
  '/worlds/chystolys-dashboard.png',
  '/worlds/image-search-main.png',
  '/worlds/forum-main.png',
  '/worlds/tic-tac-toe-main.png',

  // About page photo
  '/photo.png',

  // UI textures used by screens (dirt, stone backgrounds)
  '/textures/ui/dirt.png',
  '/textures/ui/stone.png',

  // Local icons used in achievements
  '/icons/prisma.svg',
  '/icons/aws-icon.webp',
]

/**
 * Preloads a single image. Returns a promise that resolves when
 * the image is cached by the browser, or rejects on error.
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to preload: ${src}`))
    img.src = src
  })
}

/**
 * Preloads assets sequentially during idle time.
 * Uses requestIdleCallback where available so we never block the main thread.
 * Falls back to setTimeout(0) on Safari/older browsers.
 *
 * Sequential loading is intentional: it avoids flooding the network with
 * parallel requests which could cause visible jank on the rotating panorama.
 * Each image is small enough that sequential is fast enough.
 */
async function preloadSequentially(
  assets: string[],
  signal: AbortSignal
): Promise<void> {
  for (const src of assets) {
    if (signal.aborted) return

    // Wait for an idle frame before starting the next load.
    // This ensures we never block animation frames.
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
      // Silently skip failed preloads — they'll load on demand anyway
    }
  }
}

/**
 * Hook that begins background preloading of all project assets
 * once `isReady` becomes true (i.e., after the panorama has loaded).
 *
 * Usage: usePreloadAssets(isLoaded)
 */
export function usePreloadAssets(isReady: boolean): void {
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isReady || hasStarted.current) return
    hasStarted.current = true

    const controller = new AbortController()

    // Small delay to let the loading screen fade out and the first
    // paint settle before we start hammering the network
    const timer = setTimeout(() => {
      preloadSequentially(PRELOAD_ASSETS, controller.signal)
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [isReady])
}
