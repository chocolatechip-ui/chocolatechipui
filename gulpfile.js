const gulp = require('gulp');
const pkg = require('./package.json');
const concat = require('gulp-concat');
const p = require("path");
const uglify = require('gulp-uglify');
const beautify = require('gulp-jsbeautifier');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const replaceWith = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const wrap = require('gulp-wrapper');
const noop = function() {};
const cat = require('concat');
const min = require('min.css')
const mkdir = require('mkdirp')
var cssnano = require('gulp-cssnano');

gulp.task('mkdir', function() {
  mkdir(p.join(__dirname, 'dist'))
  mkdir(p.join(__dirname, 'dist', 'css'))
  mkdir(p.join(__dirname, 'examples', 'dist', 'css'))
})

const coreChui = [
  './src/core/dom.js',
  './src/core/core.js',
  './src/core/html.js',
  './src/core/events.js',
  './src/core/gestures.js',
  './src/core/component.js',
  './src/core/state.js',
  './src/core/browsers.js'
]
gulp.task('build', function() {
  gulp.src(coreChui)
    .pipe(concat('chui.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(replaceWith('VERSION_NUMBER', pkg.version))
    .pipe(beautify({indentSize: 2}))
    .pipe(uglify())
    .pipe(rename('chui.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./examples/dist'))
})

const cssFiles = [
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
  'switch',
  'tabbar'
]

gulp.task('process-css', function() {
  var android = cssFiles.map(function(file) {
    return './src/css/android/ui-' + file + '.css'
  })
  var ios = cssFiles.map(function(file) {
    return './src/css/ios/ui-' + file + '.css'
  })

  gulp.src(android)
    .pipe(sourcemaps.init())
    .pipe(concat('chui-android.css'))
    .pipe(cssnano({advanced: true, aggressiveMerging: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('./examples/dist/css'))
  gulp.src(ios)
    .pipe(sourcemaps.init())
    .pipe(concat('chui-ios.css'))
    .pipe(cssnano({advanced: true, aggressiveMerging: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('./examples/dist/css'))
});

const exampleWidgets = [
  'color-contrast',
  'android-ripple',
  'ui-block',
  'ui-busy',
  'ui-editable',
  'ui-multi-select-list',
  'ui-navigation',
  'ui-paging',
  'ui-popover',
  'ui-popup',
  'ui-range',
  'ui-router',
  'ui-segmented',
  'ui-select-list',
  'ui-sheet',
  'ui-slideout',
  'ui-stepper',
  'ui-switch',
  'ui-tabbar'
].map(function (file) {
  return './src/widgets/' + file + '.js'
})

gulp.task('example-widgets', function() {
  gulp.src(exampleWidgets)
    .pipe(concat('widgets.min.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./examples/dist'));
  gulp.src('./src/utils/*')
    .pipe(gulp.dest('./examples/dist/utils'));
})

gulp.task('widgets', function() {
  return gulp.src('./src/widgets/ui-block.js')
    .pipe(wrap({
      header: `export default (function() {
`,
      footer: `
})()
`
    }))
    .pipe(gulp.dest('./dist/widgets'));
});

gulp.task('android-ripple', function() {
  setTimeout(function() {
  return gulp.src('./src/widgets/android-ripple.js')
    .pipe(wrap({
      header: `import './color-contrast'
import {UIColor}  from './color-contrast'
export default (function() {
`,
      footer: `
})()
`
    }))
    .pipe(gulp.dest('./dist/widgets'));
  }, 10000);
});

gulp.task('ui-color', function() {
  gulp.src('./src/widgets/color-contrast.js')
    .pipe(replaceWith('const UIColor', `export const UIColor`))
    .pipe(gulp.dest('./dist/widgets'))
})
gulp.task('ui-navigation', function() {
  gulp.src('./src/widgets/ui-navigation.js')
    .pipe(replaceWith('$(() => {', `import {Router} from './ui-router'
export const UINavigation = $(() => {
`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-switch', function() {
  gulp.src('./src/widgets/ui-switch.js')
    .pipe(replaceWith('class UISwitch', `export class UISwitch`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-stepper', function() {
  gulp.src('./src/widgets/ui-stepper.js')
    .pipe(replaceWith('class UIStepper', `export class UIStepper`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-sheet', function() {
  gulp.src('./src/widgets/ui-sheet.js')
    .pipe(replaceWith('class UISheet', `export class UISheet`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-editable', function() {
  gulp.src('./src/widgets/ui-editable.js')
    .pipe(replaceWith('class UIEditList', `export class UIEditList`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-segmented', function() {
  gulp.src('./src/widgets/ui-segmented.js')
    .pipe(replaceWith('class UISegmented', `export class UISegmented`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-select-list', function() {
  gulp.src('./src/widgets/ui-select-list.js')
    .pipe(replaceWith('class UISelectList', `export class UISelectList`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-multi-select-list', function() {
  gulp.src('./src/widgets/ui-multi-select-list.js')
    .pipe(replaceWith('class UIMultiSelectList', `export class UIMultiSelectList`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-paging', function() {
  gulp.src('./src/widgets/ui-paging.js')
    .pipe(replaceWith('class UIPaging', `import {Router} from './ui-router'
import {UINavigation} from './ui-navigation'
import '../utils/chunk'
export class UIPaging`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-popover', function() {
  gulp.src('./src/widgets/ui-popover.js')
    .pipe(replaceWith('class UIPopover', `import './ui-block'
export class UIPopover`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-popup', function() {
  gulp.src('./src/widgets/ui-popup.js')
    .pipe(replaceWith('class UIPopup', `import './ui-block'
export class UIPopup`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-slideout', function() {
  gulp.src('./src/widgets/ui-slideout.js')
    .pipe(replaceWith('class UISlideOut', `import './ui-block'
import {Router} from './ui-router'
export class UISlideOut`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-busy', function() {
  gulp.src('./src/widgets/ui-busy.js')
    .pipe(replaceWith('class UIBusy', `import './ui-block'
export class UIBusy`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-tabbar', function() {
  gulp.src('./src/widgets/ui-tabbar.js')
    .pipe(replaceWith('class UITabbar', `import {Router} from './ui-router'
export class UITabbar`))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-range', function() {
  return gulp.src('./src/widgets/ui-range.js')
    .pipe(replaceWith('class UIRange', 'export class UIRange'))
    .pipe(gulp.dest('./dist/widgets'))
})

gulp.task('ui-router', function() {
  return gulp.src('./src/widgets/ui-router.js')
    .pipe(replaceWith('class Router', 'export class Router'))
    .pipe(gulp.dest('./dist/widgets'))
})

const utils = [
  'after',
  'array_difference',
  'array_flatten',
  'array_mixin',
  'array_pluck',
  'array_unique',
  'before',
  'capitalize',
  'chunk',
  'compare',
  'debounce',
  'formatters',
  'mixin',
  'once',
  'serialize',
  'throttle',
  'validators'
].map(function (file) {
  return './src/utils/' + file + '.js'
})

gulp.task('utils', function() {
  return gulp.src(utils)
    .pipe(wrap({
      header: `export default (function() {
`,
      footer: `
})()
`
    }))
    .pipe(gulp.dest('./dist/utils'));
});

gulp.task('form', function() {
  setTimeout(function() {
  return gulp.src('./src/utils/form.js')
    .pipe(wrap({
      header: `import './validators'
export default (function() {
`,
      footer: `
})()
`
    }))
    .pipe(gulp.dest('./dist/utils'));
  }, 10000);
});

gulp.task('reference-apps', function() {
  gulp.src('./dist/chui.min.js')
    .pipe(gulp.dest('./reference-apps/Fragranž/js'))
    .pipe(gulp.dest('./reference-apps/SFCoffee/js'))
    .pipe(gulp.dest('./reference-apps/TodoMVC/js'))
    .pipe(gulp.dest('./reference-apps/Vino/js'))

  gulp.src('./dist/chui.min.js.map')
    .pipe(gulp.dest('./reference-apps/Fragranž/js'))
    .pipe(gulp.dest('./reference-apps/SFCoffee/js'))
    .pipe(gulp.dest('./reference-apps/TodoMVC/js'))
    .pipe(gulp.dest('./reference-apps/Vino/js'))

  gulp.src('./dist/widgets/*.js')
    .pipe(gulp.dest('./reference-apps/Fragranž/dev/src/widgets'))
    .pipe(gulp.dest('./reference-apps/SFCoffee/dev/src/widgets'))
    .pipe(gulp.dest('./reference-apps/TodoMVC/dev/src/widgets'))
    .pipe(gulp.dest('./reference-apps/Vino/dev/src/widgets'))

  gulp.src('./dist/utils/*.js')
    .pipe(gulp.dest('./reference-apps/Fragranž/dev/src/utils'))
    .pipe(gulp.dest('./reference-apps/SFCoffee/dev/src/utils'))
    .pipe(gulp.dest('./reference-apps/TodoMVC/dev/src/utils'))
    .pipe(gulp.dest('./reference-apps/Vino/dev/src/utils'))

  gulp.src('./dist/css/chui*')
    .pipe(gulp.dest('./reference-apps/Fragranž/css'))
    .pipe(gulp.dest('./reference-apps/SFCoffee/css'))
    .pipe(gulp.dest('./reference-apps/TodoMVC/css'))
    .pipe(gulp.dest('./reference-apps/Vino/css'))
})

// Main build function
gulp.task('dev-build', [
'widgets',
'android-ripple',
'ui-color',
'ui-busy',
'ui-navigation',
'ui-switch',
'ui-stepper',
'ui-sheet',
'ui-editable',
'ui-multi-select-list',
'ui-segmented',
'ui-select-list',
'ui-multi-select-list',
'ui-paging',
'ui-popover',
'ui-popup',
'ui-range',
'ui-router',
'ui-slideout',
'ui-tabbar',
'utils',
'form']);

gulp.task('default', ['mkdir', 'build', 'process-css', 'dev-build', 'example-widgets','reference-apps'])
