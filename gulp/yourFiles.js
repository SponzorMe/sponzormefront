'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var del = require('del');

gulp.task('cleanup', function () {
  del('./yourFiles/**/*');
});



gulp.task('views', function(){
  gulp.src(['./src/app/**/*.{html,scss}'],
    {
      base: './src/app'
    }
  )
  .pipe(gulp.dest('./yourFiles/views'))

});


gulp.task('components', function(){
  gulp.src(['bower.json'],
    {
      base: '.'
    }
  )
  .pipe(gulp.dest('./yourFiles/'))

});

gulp.task('yourFiles', ['cleanup', 'views', 'components']);
