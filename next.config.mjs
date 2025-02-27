// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = withPayload({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {}, // Ustaw jako obiekt (nawet pusty, jeśli nie potrzebujesz dodatkowych opcji)
  },
  env: {
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  },
  // Dodaj jeśli używasz własnego serwera Express
  serverRuntimeConfig: {
    payload: {
      secret: process.env.PAYLOAD_SECRET,
    },
  },
  publicRuntimeConfig: {
    payload: {
      serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
    },
  },
  // Przenieś tę opcję poza experimental
  serverExternalPackages: ['payload'],
})

export default nextConfig
