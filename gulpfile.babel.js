import gulp from "gulp";
import sass from "gulp-sass";

const paths = {
  styles: {
    src: "assets/scss/styles.scss", //소스파일명
    dest: "src/static/styles", //목적지 경로
  },
};

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}
