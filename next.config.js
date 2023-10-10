/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'www.mateusvenancio.com.br',
            },
        ],
    },
};

module.exports = nextConfig;
