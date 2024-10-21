export const pathsRewrite = () => (
  app.gulp
    .src(`${app.path.buildFolder}/**/*.html`)
    .pipe(app.plugins.replace(/\/scripts/gi, './scripts'))
    .pipe(app.plugins.replace(/\/styles/gi, './styles'))
    .pipe(app.plugins.replace(/\/img/gi, './img'))
    .pipe(app.gulp.dest(app.path.buildFolder))
);