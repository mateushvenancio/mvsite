/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'user-images.githubusercontent.com',
            },
            {
                hostname: 'github.com',
            },
            {
                hostname: 'i.imgur.com',
            },
            {
                hostname: 'lh3.googleusercontent.com',
            },
            {
                hostname: 'i.scdn.co',
            },
        ],
    },
};

module.exports = nextConfig;
