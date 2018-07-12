var gulp = require('gulp');


gulp.task('client-dist-copy', function() {
  gulp.src('client/dist/**')
  .pipe(gulp.dest('dist'))
});

gulp.task('api-dist-copy', function() {
  gulp.src('rest-api/**')
  .pipe(gulp.dest('dist/api'))
});

gulp.task('default', function() {
    
});