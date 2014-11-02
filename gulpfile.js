var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cache = require('gulp-cache'),
  declare = require('gulp-declare'),
  browserify = require('gulp-browserify'),
  wrap = require('gulp-wrap'),
  del = require('del');

var dist = 'dist/';
var src = 'src/';

gulp.task('clean', function(cb) {
  del('dist/', cb);
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/main.js')
  .pipe(browserify({
    insertGlobals : true,
    debug : true,
    shim: {
      leaflet: {
        path: 'src/lib/leaflet.js',
        exports: 'L'
      },
      leaflet_draw: {
        path: 'src/lib/leaflet.draw.js',
        depdends: {
          leaflet: 'L'
        },
        exports: 'null'
      }
    }
  }))
  .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('copy', function() {
  return gulp.src(['index.html', 'templates/*.html'], {cwd: src})
  .pipe(gulp.dest(dist));
});

gulp.task('images', function(){
  return gulp.src('src/images/**.*')
  .pipe(gulp.dest('dist/images'));
})

gulp.task('styles', function() {
  return gulp.src(['src/styles/**/*.scss'])
  .pipe(sass({style: 'expanded'}))
  .pipe(concat('main.css'))
  .pipe(gulp.dest('dist/styles'))
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch(['src/**/*.html'], ['copy']);
  gulp.watch(['src/images/**.*'], ['images']);
});

gulp.task('default', ['clean'], function(){
  gulp.start('scripts', 'styles', 'images', 'copy');
});