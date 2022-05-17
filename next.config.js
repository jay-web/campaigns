/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['http://localhost:3000','https://campaigns-lovat.vercel.app'],
  },
}

module.exports = nextConfig
