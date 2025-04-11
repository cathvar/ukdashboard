/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ukdashboard',
  assetPrefix: '/ukdashboard/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 