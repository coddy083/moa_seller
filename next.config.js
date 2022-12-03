/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com', 'moagudok.s3.ap-northeast-2.amazonaws.com'],
  },
}

module.exports = nextConfig
