/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'i.imgur.com',
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
            {
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
            },
            {
                hostname: 'img-grouvee-com.b-cdn.net',
            },
            {
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
};

module.exports = nextConfig;
