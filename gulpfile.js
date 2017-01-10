// Import modules:

var gulp = require('gulp');
var pkg = require('./package.json');
var jspm = require('gulp-jspm');
var concat = require('gulp-concat');
var gutils = require('gulp-util');
var path = require("path");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var beautify = require('gulp-jsbeautifier');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var beautify = require('gulp-jsbeautifier');
var ncp = require('ncp').ncp;
var noop = function() {};
var osTypes = ['truck-android','truck-ios','truck-windows'];
var replace = require('replace-in-file');
var replaceWith = require('gulp-replace');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

//Add Trailing slash to projectPath if not exists.
if (pkg.projectPath !== "")
  pkg.projectPath = pkg.projectPath.replace(/\/?$/, '/');

var chocolateChipFiles = [
  'domstack',
  'chui-open',
  'dom-query',
  'extend',
  'utilities',
  'dom',
  'events',
  'chui-close',
  'event-aliases',
  'gestures',
  'data',
  'types',
  'strings',
  'collection-utilities',
  'validators',
  'serialize',
  'form',
  'formatters',
  'view',
  'component',
  'promises',
  'fetch',
  'array-extras',
  'model',
  'browsers'
].map(function (file) {
  return ['./src/chocolatechip/', file, '.js'].join('')
});

var chuiWidgets = [
  'setup',
  'activity-indicator',
  'block',
  'buttons',
  'center',
  'editable',
  'multi-select-list',
  'navbar',
  'navigation',
  'paging',
  'popover',
  'popup',
  'range',
  'router',
  'screens',
  'segmented',
  'select-list',
  'sheets',
  'slideout',
  'stepper',
  'switches',
  'tabbar',
  'color-contrast',
  'android-ripple'
].map(function (file) {
  return './src/widgets/' + file + '.js'
});

var cssFiles = [
  'base',
  'busy',
  'cards',
  'editable-list',
  'forms',
  'grid',
  'multi-select',
  'paging',
  'popover',
  'popup',
  'range',
  'scroll-panel',
  'segmented',
  'select-list',
  'sheet',
  'slideout',
  'stepper',
  'switches',
  'tabbar'
]

gulp.task('chocolatechip', function() {
  gulp.src(chocolateChipFiles)
    .pipe(concat('chocolatechip.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(replaceWith('VERSION_NUMBER', pkg.version))
    .pipe(beautify({indentSize: 2}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('chocolatechip.min.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('concatWidgets', function() {
  gulp.src('./src/box.js')
    .pipe(gulp.dest('./dist'))
  gulp.src(chuiWidgets)
    .pipe(concat('chui.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('chui.min.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('chui', function() {
  gulp.src(chocolateChipFiles.concat(chuiWidgets))
    .pipe(concat('chui.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(replaceWith('VERSION_NUMBER', pkg.version))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('chui.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
})

gulp.task('chui-box', function() {
  chuiWidgets.push('./src/box.js');
  gulp.src(chocolateChipFiles.concat(chuiWidgets))
    .pipe(concat('chui-box.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(replaceWith('VERSION_NUMBER', pkg.version))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('chui-box.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
})

gulp.task('minify-android-css', function() {
  var css = cssFiles.map(function(file) {
    return './src/css/android/' + file + '.css'
  })
  return gulp.src(css)
    .pipe(sourcemaps.init())
    .pipe(concat('chui-android.min.css'))
    .pipe(cssnano({advanced: true, aggressiveMerging: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-ios-css', function() {  
  var css = [];
   cssFiles.forEach(function(file) {
    css.push('./src/css/ios/' + file + '.css')
  })
  return gulp.src(css)
    .pipe(sourcemaps.init())
    .pipe(concat('chui-ios.min.css'))
    .pipe(cssnano({advanced: true, aggressiveMerging: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css', ['minify-android-css','minify-ios-css'])

gulp.task('build', ['chocolatechipjs', 'concatWidgets']);
gulp.task('default', ['chui', 'minify-css']);
gulp.task('all', ['chocolatechip', 'chui', 'chui-box', 'minify-css'])

