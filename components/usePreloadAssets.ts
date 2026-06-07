'use client'

/**
 * All assets grouped by route to prefetch on hover.
 */
export const ASSETS_BY_ROUTE: Record<string, string[]> = {
  '/projects': [
    '/worlds/chystolys-icon.png',
    '/worlds/image-search-icon.webp',
    '/worlds/forum-icon.png',
    '/worlds/tic-tac-toe-icon.png',
    '/worlds/chystolys-home.png',
    '/worlds/chystolys-dashboard.png',
    '/worlds/image-search-main.png',
    '/worlds/forum-main.png',
    '/worlds/tic-tac-toe-main.png',
    '/textures/ui/dirt.png',
  ],
  '/achievements': [
    '/icons/prisma.svg',
    '/icons/aws-icon.webp',
    '/textures/ui/stone.png',
    '/textures/ui/dirt.png',
  ],
  '/about': [
    '/photo.png',
    '/textures/ui/dirt.png',
  ],
  '/contact': [],
}

// Keep track of already prefetched assets to avoid redundant loads
const prefetchedAssets = new Set<string>()

/**
 * Prefetches the assets for a given route using a JavaScript Image object.
 * This works across all browsers (including Safari) and guarantees the assets
 * are cached by the browser prior to page entry.
 */
export function prefetchAssetsForRoute(route: string): void {
  const assets = ASSETS_BY_ROUTE[route]
  if (!assets) return

  for (const src of assets) {
    if (prefetchedAssets.has(src)) continue
    prefetchedAssets.add(src)

    if (typeof window !== 'undefined') {
      const img = new window.Image()
      img.src = src
    }
  }
}

export function usePreloadAssets(isReady: boolean): void {
  // Empty: we now prefetch routes and assets on button hover
}
