var gulp = require('gulp');

// Clean

var clean = require('gulp-clean');

gulp.task('clean', function () {
  gulp.src('dist')
      .pipe(clean());
});

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

// RequireJS Build

var rjs = require('requirejs');

gulp.task('build', function (cb) {
  rjs.optimize({
    appDir: './static',
    mainConfigFile: 'static/app/main.js',
    dir: './dist',
    modules: [
      { name: 'main' }
    ],
    removeCombined: true
  }, function () {
    cb();
  }, cb);
});

// Combined tasks

gulp.task('predeploy', ['clean', 'lint', 'build']);
