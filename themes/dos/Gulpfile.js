var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var bourbon = require('node-bourbon').includePaths;
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp
    .src('assets/sass/index.scss')
    .pipe(sass({
      includePaths: [].concat(bourbon).concat(neat)
    }))
    .pipe(autoprefixer())
    .on('error', function(error){
      gutil.log(error.messageFormatted);
    })
    .pipe(gulp.dest('static/css'));
});

gulp.task('js', function(){
  return gulp
    .src('./assets/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('static/js'));

});

gulp.task('watch', function(){
  gulp.watch('./assets/js/**/*.js', ['js']);
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

