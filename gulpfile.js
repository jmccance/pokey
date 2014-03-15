var gulp = require('gulp');

var jshint = require('gulp-jshint');
var coffeelint = require('gulp-coffeelint');

gulp.task('jshint', function () {
  gulp.src('static/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('coffeelint', function () {
  gulp.src(['**/*.coffee', '!node_modules/**/*.coffee'])
    .pipe(coffeelint({
      optFile: 'coffeelint.json'
    }))
    .pipe(coffeelint.reporter('default'));
});

gulp.task('lint', ['jshint', 'coffeelint']);
