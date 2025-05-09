/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sign: ['SignPainter'], // ← добавили шрифт
                pacif: ['Pacifico'], // ← добавили шрифт
                montserrat: ['Montserrat', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            backgroundImage: {
                'custom-gradient':
                    'linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 10%, #0015FF 25%, #FF0000 75%, #FFFFFF 90%, #FFFFFF 100%)',
                'tricolor-gradient':
                    'linear-gradient(90deg,#FFFFFF 0%, #001EFF 50%, #FF0000 100%)',
                'leisure-block-bg':
                    'linear-gradient(180deg, #1570EF 0%, #0C4089 50%, #0C4089 100%)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
            animation: {
                'marquee-left': 'marquee-left linear infinite',
                'marquee-right': 'marquee-right linear infinite',
            },
            keyframes: {
                'marquee-left': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
        },
    },
    plugins: [
        plugin(({ addBase, theme }) => {
            addBase({
                '.scroll-bar': { overflowY: 'auto' },
                'scrollbar-hide::-webkit-scrollbar': {
                    display: 'none',
                },
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                },
                '.scroll-bar::-webkit-scrollbar-button': {
                    display: 'none',
                },
                '.scroll-bar-table::-webkit-scrollbar': {
                    width: '0px',
                    borderRadius: '9999px',
                },
                '.scroll-bar-table::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('color.gray["300"]'),
                    borderRadius: '9999px',
                },
                '.scroll-bar-table::-webkit-scrollbar-track': {
                    backgroundColor: theme('color.gray["100"]'),
                    borderRadius: '9999px',
                },
                '.scroll-bar-select::-webkit-scrollbar': {
                    width: '14px',
                    borderRadius: '10px',
                },
                '.scroll-bar-select::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('colors.gray.300'),
                    borderRadius: '10px',
                    border: '4px solid white',
                },
                '.scroll-bar-select::-webkit-scrollbar-track': {
                    backgroundColor: 'white',
                    borderRadius: '10px',
                },
            })
        }),
        require('tailwindcss-animate'),
        require('@tailwindcss/line-clamp'),
    ],
}
