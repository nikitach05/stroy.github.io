import { defineConfig } from "vite"

import vituum from 'vituum'
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
        nunjucks({
            root: './src',
            data: ['./src/data/**/*.json'],
        })
    ],
    server: {
        open: true
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true
            },
        },
    },
    build: {
        manifest: false,
        modulePreload: false,
        rollupOptions: {
            output: {
                chunkFileNames: "scripts/[name].js",
                entryFileNames: "scripts/[name].js",
                assetFileNames: (asset) => {
                    if (/\.css$/.test(asset.name ?? "")) {
                        return "styles/[name].css"
                    }
                    // if (/\.woff2$/.test(asset.name ?? "")) {
                    //     return "fonts/[name].woff2"
                    // }
                    const formats = /\.(jpeg|jpg|png|webp|avif|heif|tiff)$/i;
                    if (formats.test(asset.name ?? "")) {
                        return `img/[name]${asset.name.match(formats)[0]}`; // Use the matched extension
                    }
                    return "assets/[name][extname]"
                },
            }
        }
    }
})