import {defineConfig, loadEnv, ConfigEnv, UserConfig} from 'vite'

import vue from '@vitejs/plugin-vue'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        // 设置别名
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [vue()],
    server: {
        port: 8080,
        hmr: {
            host: '127.0.0.1',
            port: 8080
        },
        // 设置https代理
        proxy: {
            'api': {
                // target:'https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0',
                target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})
