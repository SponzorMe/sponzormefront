var gulp = require('gulp'),
  usemin = require('gulp-usemin'),
  minifyCSS = require('gulp-cssnano'),
  concatCss = require('gulp-concat-css'),
  concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
  uglify = require('gulp-uglify'),
  minifyHTML = require('gulp-htmlmin'),
  clean = require('gulp-rimraf'),
  imagemin = require('gulp-imagemin'),
  serve = require('gulp-serve'),
  ngAnnotate = require('gulp-ng-annotate'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  inject = require('gulp-inject'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util');

var paths = {
  sass: ['./scss/**/*.scss']
};

var errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

gulp.task('styles', function() {

  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src(['./scss/**/*.scss', '!./scss/index.scss', '!./scss/ignoreStyles/*.scss'], {
    read: false
  });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace('app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src('./scss/index.scss')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)).on('error', errorHandler('Sass'))
    .pipe(autoprefixer()).on('error', errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('cleanStyles', function() {
  return gulp.src('./app/styles/index.css', {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ignoreStyles/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/styles/'))
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./app/styles/'))
    .on('end', done);
});

gulp.task('main', function() {
  gulp.src(['app/index.html'])
    .pipe(usemin({
      vendorCss: [minifyCSS({zindex: false}), 'concat'],
      appCss: [minifyCSS(), 'concat'],
      vendorJs: [ngAnnotate(), uglify(), 'concat'],
      appJs: [ngAnnotate(), uglify(), 'concat']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src(['app/views/*.html', 'app/views/**/*.html', 'app/views/**/**/*.html'])
    .pipe(gulp.dest('dist/views'));
});

gulp.task('templates', function(){
 var opts = {
   conditionals: true,
   spare: true
 };
 return gulp.src(['app/**/*.html'])
   .pipe(gulp.dest('dist/'));
});


gulp.task('images', function() {
  return gulp.src(['app/images/*.*', 'app/images/**/*.*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('extras', function() {
  return gulp.src(['app/favicon.ico', 'app/robots.txt', 'app.yaml'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('videos', function() {
  return gulp.src(['app/video/*.*'])
    .pipe(gulp.dest('dist/video'));
});

gulp.task('langs', function() {
  return gulp.src(['app/langs/*.json'])
    .pipe(gulp.dest('dist/langs/'));
});


gulp.task('clean', function() {
  return gulp.src(['dist/**/*.*', 'dist/**/**/*.*', 'dist/*.*', 'dist/*'], {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

gulp.task('build', ['styles', 'videos', 'main', 'views', 'templates', 'images', 'langs', 'extras']);

gulp.task('success', ['clean'], function() {
  gulp.start('build');
});

gulp.task('default', ['lint'], function() {
  gulp.start('success');
});

gulp.task('serve', function() {
  gulp.start('default');
  browserSync.init({
    notify: false,
    https: false,
    port: 9000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components',
        '/libs': 'libs',
      }
    }
  });
  gulp.watch([
    'app/index.html',
    'app/views/*.html',
    'app/views/**/*.html',
    'app/**/*.html',
    'app/langs/*.json',
    'app/*.js',
    'app/**/*.js',
    'app/**/**/*.js',
    'app/styles/*.css',
    'bower_components/*'
  ]).on('change', browserSync.reload);
  gulp.watch(paths.sass, ['styles']);
  gulp.watch('bower.json');
});

gulp.task('serve:dist', function() {
  browserSync.init({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['dist']
    }
  });
});
gulp.task('lint', function() {
  return gulp.src(['app/**/*.js', 'app/**/**/*.js', 'app/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
