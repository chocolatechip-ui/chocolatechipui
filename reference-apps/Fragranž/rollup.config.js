// Rollup plugins
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'dev/app.js',
  dest: 'js/app.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    (uglify()),
  ],
};