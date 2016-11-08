var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script', function() {
   return gulp.src(['app/**/*.js', '!./app/bower_components/**'])
    .pipe(concat('app-build.js'))
   	.pipe(uglify())
    .pipe(gulp.dest('.'))
});

gulp.task('default', ['script']);