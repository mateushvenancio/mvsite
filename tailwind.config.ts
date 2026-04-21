import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                cosmos: {
                    ink: '#0f1117',
                    deep: '#1a1f2e',
                    navy: '#1e2d4a',
                    blue: '#2563eb',
                    gold: '#c49a3c',
                    'gold-light': '#e8c96d',
                    dust: '#f0ece4',
                    paper: '#fafaf7',
                    muted: '#6b7280',
                    border: '#e5e2d8',
                    'border-strong': '#d1cdc0',
                },
            },
            fontFamily: {
                display: ['DM Serif Display', 'Georgia', 'serif'],
                sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
                mono: ['DM Mono', 'Courier New', 'monospace'],
            },
            animation: {
                'orbit-pulse': 'orbit-pulse 8s ease-in-out infinite',
                'bar-dance': 'bar-dance 1.2s ease-in-out infinite',
            },
            keyframes: {
                'orbit-pulse': {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.01)' },
                },
                'bar-dance': {
                    '0%, 100%': { transform: 'scaleY(0.4)' },
                    '50%': { transform: 'scaleY(1)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
