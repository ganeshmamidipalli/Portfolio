/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
    domains: ["images.ctfassets.net"], // Keep the existing domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
