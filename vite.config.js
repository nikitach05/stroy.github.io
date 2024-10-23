import { defineConfig } from "vite"

import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import { splitVendorChunkPlugin } from 'vite'

import babel from "@rollup/plugin-babel"
import resolvePlugin from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"

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
                    const formats = /\.(jpeg|jpg|gif|png|webp|avif|heif|tiff)$/i;
                    if (formats.test(asset.name ?? "")) {
                        return `img/[name]${asset.name.match(formats)[0]}`; // Use the matched extension
                    }
                    if (/sprite\.svg$/.test(asset.name ?? "")) {
                        return "img/svg-sprite/[name].svg"
                    }
                    return "assets/[name][extname]"
                },
            },
            plugins: process.argv.includes('--mode=production') ? [resolvePlugin(), commonjs(), babel({ babelHelpers: 'bundled' }), terser()] : []
        }
    }
})