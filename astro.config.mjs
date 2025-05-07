// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind({ applyBaseStyles: false })],
    output: 'server',
    image: {
        domains: ['81.31.247.179'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '81.31.247.179',
                port: '',
                pathname: '/**',
            },
        ],
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                allowCorsImageOriginList: ['http://81.31.247.179'],
            },
        },
    },
})
