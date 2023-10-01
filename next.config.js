/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: {
    permanent: false,
    destination: '/ps7',
    source: '/'
  }
}

module.exports = nextConfig
