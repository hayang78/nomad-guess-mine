//파일명을 gulpfile.babel.js로 만들면 gulp가 자동으로 babelrc파일을 찾아서 그 설정대로 동작하게 해줌
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

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
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}
