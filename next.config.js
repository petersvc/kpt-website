// @type {import('next').NextConfig}
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.kabum.com.br', 'img.terabyteshop.com.br']
  }
}

module.exports = nextConfig
