import { defineConfig } from "vite"

import vituum from 'vituum'
// import pages from 'vituum/plugins/pages.js'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
    // root: './',
    // build: {
    //     outDir: './dist',
    //     rollupOptions: {
    //         input: [
    //             './src/scripts/index.js',
    //             './src/styles/index.scss'
    //         ]
    //     }
    // },
    plugins:
    [
        splitVendorChunkPlugin(),
        vituum(),
        // pages({
        //     root: './src/views',
        //     dir: './src/views/pages',
        // }),
        nunjucks({
            root: './src',
            data: ['./src/data/**/*.json'],
        })
    ],
    server: {
        open: true
    },
    build: {
        modulePreload: false,
        rollupOptions: {
            output: {
                chunkFileNames: "scripts/[name].js",
                entryFileNames: "scripts/[name].js",
                assetFileNames: (asset) => {
                    if (/\.css$/.test(asset.name ?? "")) {
                        return "styles/[name].css"
                    }
                    if (/\.woff2$/.test(asset.name ?? "")) {
                        return "fonts/[name].woff2"
                    }
                    return "assets/[name][extname]"
                },
            }
        }
    }
})