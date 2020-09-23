const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const htmlValidator = require("gulp-w3c-html-validator");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const sync = require("browser-sync").create();

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write("."))
    .pipe(rename({ suffix: ".min"}))
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
    .pipe(terser())
    .pipe(sourcemap.write("."))
    .pipe(rename({suffix: ".min"}))
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
