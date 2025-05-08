// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

const apiHost = process.env.API_HOST || '81.31.247.179'
const apiBaseUrl = process.env.API_BASE_URL || `http://${apiHost}`

export default defineConfig({
    integrations: [react(), tailwind({ applyBaseStyles: false })],
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    image: {
        domains: [apiHost],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: apiHost,
                port: '',
                pathname: '/**',
            },
        ],
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                allowCorsImageOriginList: [apiBaseUrl],
            },
        },
    },
})
