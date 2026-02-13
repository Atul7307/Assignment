/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/car-rental-core-php',
  },
  images: {
    domains: ['localhost'], // For local development
  },
}

module.exports = nextConfig