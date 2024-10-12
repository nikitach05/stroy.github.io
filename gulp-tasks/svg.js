"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import svgmin from "gulp-svgmin";
import debug from "gulp-debug";

gulp.task("svg", () => {
    return gulp.src(paths.svg.src)
        .pipe(svgmin())
        .pipe(gulp.dest(paths.svg.dist))
        .pipe(debug({
            "title": "SVG"
        }));
});