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

/**
 * Injects <link rel="prefetch"> tags into the document head.
 * The browser will download these at low priority in the background.
 */
export function prefetchAssetsForRoute(route: string): void {
  const assets = ASSETS_BY_ROUTE[route]
  if (!assets) return

  for (const src of assets) {
    // Skip if already prefetched
    if (document.querySelector(`link[rel="prefetch"][href="${src}"]`)) continue

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}

export function usePreloadAssets(isReady: boolean): void {
  // Empty: we now prefetch routes and assets on button hover
}
