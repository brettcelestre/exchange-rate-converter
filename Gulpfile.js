
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack')

gulp.task('css', () => {
  return gulp.src('./client/assets/sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./client/assets/css/'));
});

gulp.task('watch', () => {
  gulp.watch(['./client/assets/sass/styles.scss', 'Gulpfile.js'], ['css']);
});

gulp.task('webpack', function() {
  return gulp.src('./app.module.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('client/'));
})

gulp.task('default', ['watch', 'webpack']);
