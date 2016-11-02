var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jspm = require('gulp-jspm');
var sourcemaps = require('gulp-sourcemaps');

// Static Server & watching files:
gulp.task('serve', ['build'], function () {
    browserSync({
      server: './',
      port: 4040,
      server: {
        open: false
      }
    }).reload;
});

gulp.task('watch', function() {
  gulp.watch('./index.html').on('change', reload);
  gulp.watch(['./dev/app.js', './dev/*/**.js'], ['build']);
  gulp.watch('./js/app.js').on('change', reload);
})

// Process app.js:
gulp.task('build', function () {
  return gulp.src('./dev/app.js')
    .pipe(sourcemaps.init())
    .pipe(jspm({fileName: 'app' ,selfExecutingBundle: true, minify: true, mangle: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'))
});


// Process app.js and load page in browser:
gulp.task('default', ['serve', 'watch']);