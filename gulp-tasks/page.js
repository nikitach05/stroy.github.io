"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import fs from "fs";
import yargs from "yargs";
import child_process from "child_process";

const exec = child_process.exec;

const argv = yargs.argv,
    production = !!argv.production;

gulp.task('page', function(done) {
    const fileName = argv.name;

    fs.writeFile(paths.page.styles + fileName + '.scss', '', function(err) {
        console.log('scss файл создан');
        exec('code ' + paths.page.styles + fileName + '.scss');
    });

    fs.writeFile(paths.page.nj + fileName + '.nj', '', function(err) {
        console.log('nj файл создан');
        exec('code ' + paths.page.nj + fileName + '.nj');
    });

    fs.appendFile( paths.page.import, '@import "../' + fileName + '";\n', function(err) {
        console.log('импорт добавлен в файл styles/pages/import/import.scss');
    });

    done();
});