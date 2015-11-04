var gulp = require('gulp'),
	usemin = require('gulp-usemin'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	clean = require('gulp-rimraf'),
	imagemin = require('gulp-imagemin'),
	serve = require('gulp-serve'),
	ngAnnotate = require('gulp-ng-annotate'),
	eslint = require('gulp-eslint')
	browserSync = require('browser-sync').create();

gulp.task('main', function()
{
  gulp.src(['app/index.html'])
	.pipe(usemin({
			css: [minifyCSS(), 'concat'],
			js: [ngAnnotate(), 'concat']
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(['app/views/*.html','app/views/**/*.html',,'app/views/**/**/*.html'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('imagenes', function () {
    return gulp.src(['app/images/*.*','app/images/**/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('extras', function () {
    return gulp.src(['app/favicon.ico','app/robots.txt'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('extras1', function(){
	return gulp.src(['app/styles/event-page.css'])
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/styles/'));

});

gulp.task('langs', function () {
    return gulp.src(['app/langs/*.json'])
        .pipe(gulp.dest('dist/langs/'));
});

gulp.task('fonts', function () {
    return gulp.src(['app/fonts/*.*','app/fonts/**/*.*'])
        .pipe(gulp.dest('dist/fonts/'));
});


gulp.task('clean', function() {
    return gulp.src(['dist/**/*.*','dist/**/**/*.*','dist/*.*','dist/*'], { read: false })
           .pipe(clean({ force: true }));
});
gulp.task('build', ['main','views','imagenes','langs','fonts','extras','extras1']);

gulp.task('success', ['clean'], function() {
  gulp.start('build');
});

gulp.task('default',['lint'],function(){
	gulp.start('success');
});

gulp.task('serve', function (){
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/views/*.html',
    'app/views/**/*.html',
    'langs/*.json',
    'app/scripts/*.js',
    'app/scripts/**/*.js',
    'app/scripts/**/**/*.js',
    'bower_components/*',
  ]).on('change', browserSync.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json');
});

gulp.task('serve:dist', function (){
  gulp.start('default');
  browserSync.init({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('lint', function () {
    return gulp.src(['app/scripts/**/*.js','app/scripts/**/**/*.js','app/scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
