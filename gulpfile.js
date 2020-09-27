const gulp = require("gulp"),
      plumber = require("gulp-plumber"),
      sourcemap = require("gulp-sourcemaps"),
      sass = require("gulp-sass"),
      postcss = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      csso = require("gulp-csso"),
      htmlValidator = require("gulp-w3c-html-validator"),
      htmlmin = require("gulp-htmlmin"),
      babel = require("gulp-babel"),
      terser = require("gulp-terser"),
      rename = require("gulp-rename"),
      imagemin = require("gulp-imagemin"),
      sync = require("browser-sync").create();

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({ suffix: ".min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

const jsMin = () => {
  return gulp.src("source/js/*.js")
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(terser())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/js"));
}

exports.jsMin = jsMin;

const imageMin = () => {
  return gulp.src("source/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
}

exports.imageMin = imageMin;

const fontsCopy = () => {
  return gulp.src ("source/fonts/*")
    .pipe(gulp.dest("build/fonts"));
}

exports.fontsCopy = fontsCopy;

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    ui: false,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles)).on("change", sync.reload);
  gulp.watch("source/js/*.js", gulp.series(jsMin)).on("change", sync.reload);
  gulp.watch("source/img/*", gulp.series(imageMin));
  gulp.watch("source/*.html", gulp.series(html)).on("change", sync.reload);
}

exports.default = gulp.series(
  styles, html, jsMin, imageMin, fontsCopy, server, watcher
);

exports.build = gulp.series(
  styles, html, jsMin, imageMin, fontsCopy
);
