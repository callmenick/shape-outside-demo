(function() {
  'use strict'

  /**
   * Requirements
   */
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var browserSync = require('browser-sync').create();
  var cssmin = require('gulp-cssmin');
  var jshint = require('gulp-jshint');
  var sass = require('gulp-sass');
  var stylish = require('jshint-stylish');

  /**
   * Styles
   */
  gulp.task('styles', function() {
    return gulp.src(['scss/**/*.scss'])
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('css'))
      .pipe(cssmin());
  });

  /**
   * Scripts linting
   */
  gulp.task('lint', function() {
    return gulp.src(['js/**/*/js', '!js/vendor/**/*/js'])
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  /**
   * Serve task
   */
  gulp.task('serve', ['styles', 'lint'], function() {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });

    gulp.watch(['scss/**/*.scss'], ['styles']);
    gulp.watch(['js/**/*.js'], ['lint']);
    gulp.watch('./*.html').on('change', browserSync.reload);
  });

  /**
   * Default task
   */
  gulp.task('default', ['styles', 'lint']);
})();
