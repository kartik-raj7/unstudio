/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_BASE_URL: process.env.NEXT_BASE_URL,
      },
      images: {
        domains: ['res.cloudinary.com'],
      },
};

export default nextConfig;
