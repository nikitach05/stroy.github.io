"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";
import sizeOf from "image-size";
import through2 from "through2";
import cheerio from "cheerio";

gulp.task('img-sizes', function() {
  return gulp.src(paths.imgSizes.src)
    .pipe(through2.obj(function(file, enc, cb) {
      if (file.isBuffer()) {
        const $ = cheerio.load(file.contents.toString());

        $('img').each(function() {
          const img = $(this);
          const imagePath = img.attr('src');
          const dimensions = sizeOf(`dist/${imagePath}`);
          const width = dimensions.width;
          const height = dimensions.height;

          img.attr('width', width);
          img.attr('height', height);
        });

        file.contents = Buffer.from($.html());
      }

      cb(null, file);
    }))
    .pipe(gulp.dest(paths.imgSizes.dist))
    .pipe(debug({
        "title": "img-sizes"
      }));
});

// Cheerio - это модуль, который предоставляет простой и удобный способ парсить и манипулировать HTML-данными. Он позволяет использовать синтаксис и функции, аналогичные тем, которые предоставляет jQuery, для выбора и изменения элементов HTML.

// В контексте задачи, описанной выше, Cheerio используется для парсинга HTML файла и добавления атрибутов width и height к тегам img. Он позволяет выбрать все теги img в HTML файле и изменить их атрибуты, основываясь на размерах соответствующих изображений. Использование Cheerio вместе с модулями, такими как through2 и sizeOf, позволяет автоматизировать процесс обновления атрибутов width и height в HTML файлах.