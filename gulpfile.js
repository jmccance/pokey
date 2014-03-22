var gulp = require('gulp');

// Linting

var coffeelint = require('gulp-coffeelint');
var jshint = require('gulp-jshint');

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

// Nodemon

var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({
    script: 'server.coffee',
    ext: 'coffee'
  });
});
