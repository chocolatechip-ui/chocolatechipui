var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var rollup = require('rollup')
var babel =  require('rollup-plugin-babel')
var uglify =  require('rollup-plugin-uglify')

// Static Server & watching files:
gulp.task('serve', ['build'], function () {
  browserSync({
    server: './',
    port: 4040,
    server: {
      open: false
    }
  }).reload
})

gulp.task('watch', function() {
  gulp.watch('./index.html').on('change', reload)
  gulp.watch(['./dev/app.js', 'dev/**/*.js'], ['build', reload])
  gulp.watch('./js/app.js').on('change', reload)
  gulp.watch('css/*.css').on('change', reload)
})

// Process app.js:
gulp.task('build', function () {
  return rollup.rollup({
    entry: './dev/app.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      uglify({
        compress: {
          collapse_vars: true
        }
      })
    ]
  })
  .then((bundle) => {
    bundle.write({
      format: 'iife',
      moduleName: 'app',
      dest: './js/app.js',
      sourceMap: true
    })
  })
})


// Process app.js and load page in browser:
gulp.task('default', ['serve', 'watch']);
