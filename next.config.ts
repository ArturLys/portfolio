import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Cache all static assets (images, fonts, sounds, textures) for 1 year
      source: "/:path*(png|jpg|jpeg|webp|svg|ico|ttf|woff|woff2|ogg|mp3)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
