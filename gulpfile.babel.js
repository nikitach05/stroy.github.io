// "use strict";

// import gulp from "gulp";

// const requireDir = require("require-dir"),
//     paths = {
//         nunjucks: {
//             src: [
//                 "./src/views/pages/*.{nj,nunjucks}",
//             ],
//             templates: "./src/views/templates/",
//             dist: "./dist/",
//             watch: [
//                 "./src/views/**/*.{nj,nunjucks}"
//             ]
//         },
//         styles: {
//             src: "./src/styles/main.{scss,sass}",
//             dist: "./dist/styles/",
//             watch: [
//                 "./src/blocks/**/*.{scss,sass}",
//                 "./src/styles/**/*.{scss,sass}"
//             ]
//         },
//         scripts: {
//             src: "./src/js/index.js",
//             dist: "./dist/js/",
//             watch: [
//                 "./src/js/**/*.js"
//             ]
//         },
//         libs: {
//             src: "./src/js/libs/**/*.js",
//             dist: "./dist/libs/"
//         },
//         images: {
//             src: [
//                 "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}",
//                 "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
//             ],
//             dist: "./dist/img/",
//             watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,webp}"
//         },
//         imgSizes: {
//             src: [
//                 "./dist/*.html",
//             ],
//             dist: "./dist/",
//             watch: "./dist/*.{html}"
//         },
//         svg: {
//             src: [
//                 "./src/img/**/*.{svg}"
//             ],
//             dist: "./dist/img/",
//             watch: "./src/img/**/*.{svg}"
//         },
//         video: {
//             src: [
//                 "./src/video/**/*.{mp4,webm}"
//             ],
//             dist: "./dist/video/",
//             watch: "./src/video/**/*.{mp4,webm}"
//         },
//         sprites: {
//             src: "./src/img/sprites/*.svg",
//             dist: "./dist/img/sprites/",
//             watch: "./src/img/sprites/*.svg"
//         },
//         fonts: {
//             src: "./src/fonts/**/*.{woff,woff2}",
//             dist: "./dist/fonts/",
//             watch: "./src/fonts/**/*.{woff,woff2}"
//         },
//         favicons: {
//             src: "./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
//             dist: "./dist/img/favicons/",
//         },
//         gzip: {
//             src: "./src/.htaccess",
//             dist: "./dist/"
//         },
//         page: {
//             styles: "./src/styles/pages/",
//             nj: "./src/views/pages/",
//             import: "./src/styles/pages/import/import.scss"
//         },
//     };

// requireDir("./gulp-tasks/");

// export { paths };

// export const development = gulp.series("clean",
//     gulp.parallel(["nunjucks", "styles", "scripts", "libs", "images", "sprites", 'video', "fonts"]),
//     gulp.parallel("serve"));

// export const prod = gulp.series("clean",
//     gulp.parallel(["nunjucks", "styles", "scripts", "images", "sprites", "libs", 'video', 'svg', "fonts", "favicons", "gzip"]), "img-sizes");

// export default development;