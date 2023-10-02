/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [{
    permanent: false,
    destination: '/ps7',
    source: '/'
  }]
}

module.exports = nextConfig
