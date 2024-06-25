/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "kc21xaah5de38ehp.public.blob.vercel-storage.com",
        protocol: "https",
      },
    ],
  },
}

export default config
