"use strict";
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var del = require('del');

var paths = {
	"src" : ['src/lib/**/*.js','src/navitree.js'],
  "test" :['test/navitree_*.js']
};
gulp.task('clean', function() {
  return del(['./built']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('navitree.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('built'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['lint','mocha','scripts']);
  gulp.watch(paths.test, ['lint_test','mocha']);
});
gulp.task('lint',function(){
	return gulp.src(paths.src)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});
gulp.task('lint_test',function(){
  return gulp.src(paths.test)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
gulp.task('mocha', function () { 
  return gulp.src(paths.test , {read: false}) 
  // gulp-mocha needs filepaths so you can't have any plugins before it .pipe(mocha({reporter: 'spec'})); });
  .pipe(mocha({reporter: 'spec'}));
});
gulp.task('default', ['watch', 'lint','lint_test','mocha','scripts']);
