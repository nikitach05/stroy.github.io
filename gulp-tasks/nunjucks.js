"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import nunjucks from "gulp-nunjucks-render";
import yargs from "yargs";
import data from "gulp-data";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("nunjucks", () => {
    return gulp.src(paths.nunjucks.src)
    .pipe(data(function() {
        return require("../src/views/data/data.json")
    }))
    .pipe(nunjucks({
        path: paths.nunjucks.templates
    }))
    .pipe(gulpif(production, replace(".css", ".min.css"))).pipe(gulpif(production, replace(".js", ".min.js"))).pipe(gulp.dest(paths.nunjucks.dist))
    .pipe(browsersync.stream());
});