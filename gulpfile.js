var gulp = require('gulp');

var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  gulp.src('./static/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
