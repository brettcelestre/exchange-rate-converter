
let gulp = require('gulp'),
    sass = require('gulp-sass')

gulp.task('css', () => {
  return gulp.src('./client/assets/sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./client/assets/css/'));
});

gulp.task('watch', () => {
  gulp.watch(['./client/assets/sass/styles.scss', 'Gulpfile.js'], ['css']);
});

gulp.task('default', ['watch']);
