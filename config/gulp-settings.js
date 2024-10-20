import * as nodePath from 'path';
import util from 'gulp-util';

// Получаем имя папки проекта
const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './dist';
const srcFolder = './src';
// const assetsFolder = `${srcFolder}/assets`;

// Пути к папкам и файлам проекта
const path = {
  build: {
    html: `${buildFolder}/`,
    scripts: `${buildFolder}/scripts/`,
    styles: `${buildFolder}/styles/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    templates: `${srcFolder}/templates`,
    scripts: `${srcFolder}/scripts`,
    styles: `${srcFolder}/styles`,
    images: `${srcFolder}/img`,
    // svgicons: `${srcFolder}/svg-sprite/*.svg`,
  },
  assets: {
    images: `${srcFolder}/img/**/*.*`,
    fonts: `${srcFolder}/fonts/**/*.{woff,woff2}`,
    svgicons: `${srcFolder}/svg-sprite/*.svg`,
  },

  // Путь к нужной папке на удаленном сервере. gulp добавит имя папки проекта автоматически
  ftp: {
    html: `/htdocs/${rootFolder}`,
    server: '',
  },

  clean: buildFolder,
  buildFolder,
  rootFolder,
  srcFolder,
};

// Настройка FTP соединения
const configFTP = {
  html: {
    host: '',
    user: '',
    password: '',
    parallel: 10, // Кол-во одновременных потоков
    log: util.log,
  },
  server: {
    host: '', // Адрес FTP сервера
    user: '', // Имя пользователя
    password: 'P', // Пароль
    parallel: 5, // Кол-во одновременных потоков
    log: util.log,
  },
};

export { path, configFTP };
