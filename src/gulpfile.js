var gulp = require('gulp');
var uglify = require('gulp-uglify');
concat    = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var notify = require('gulp-notify');


// define plug-ins
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');


//sass

gulp.task('sass', function () {
 	console.log('entro....');
    gulp.src('scss/*.scss')
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
        .pipe(concat('dashboard.css'))
        .pipe(minifycss())
        .pipe(rename('dashboard.min.css'))
        .pipe(concat('style.css'))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(concat('page.css'))
        .pipe(minifycss())
        .pipe(rename('page.min.css'))
        .pipe(gulp.dest('css/'))
 });

gulp.task('default', ['sass']);


