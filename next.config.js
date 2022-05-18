/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:3000", "campaigns-dapp.s3.amazonaws.com"]
  },
}

module.exports = nextConfig
