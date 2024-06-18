/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prlabsapi.com',
            }
        ],
    },
};

export default nextConfig;

