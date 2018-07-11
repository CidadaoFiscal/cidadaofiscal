var gulp = require('gulp');


gulp.task('client-dist-copy', function() {
  gulp.src('client/dist/*')
  .pipe(gulp.dest('dist'))
});

gulp.task('default', function() {
    
});