/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    PEXEL_API_KEY: "563492ad6f91700001000001fa3ba1c4f717433fa7f0c75b6bd09180",
  },
};