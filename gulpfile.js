var gulp = require('gulp'),
	usemin = require('gulp-usemin'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('css', function ()
{
  gulp.src('app/styles/*.css')
    .pipe(concatCss("main.css"))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify("Ha finalizado la task css!"));
});

gulp.task('js', function()
{
  gulp.src(['app/scripts/app.js','app/scripts/**/*.js','app/scripts/**/**/*.js'])
		.pipe(ngAnnotate())
  	.pipe(concatJs('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify("Ha finalizado la task js!"));
});

gulp.task('html', function()
{
  gulp.src(['app/index.html'])
	.pipe(usemin({
			css: [minifyCSS(), 'concat'],
			js: [ngAnnotate(), uglify(), 'concat']
	}))
	.pipe(gulp.dest('dist'));
});
