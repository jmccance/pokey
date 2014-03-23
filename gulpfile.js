/* jshint strict: false */

var gulp = require('gulp');

var paths = {
  server: ['**/*.coffee', '!node_modules/**/*.coffee'],
  client: 'static/app/**/*.js'
};

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
  return gulp.src(paths.client)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('coffeelint', function () {
  return gulp.src(paths.server)
    .pipe(coffeelint({
      optFile: 'coffeelint.json'
    }))
    .pipe(coffeelint.reporter('default'));
});

gulp.task('lint', ['jshint', 'coffeelint']);

// Nodemon

var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
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

    optimize: 'uglify2',
    removeCombined: true,
    preserveLicenseComments: false,
    generateSourceMaps: true
  }, function () {
    cb();
  }, cb);
});

// Combined tasks

gulp.task('develop', ['nodemon']);
gulp.task('predeploy', ['lint', 'build']);
