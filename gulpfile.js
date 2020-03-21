const { series, parallel } = require('gulp')
const { src, dest } = require('gulp')
const concatCss = require('gulp-concat-css')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const injectInline = require('gulp-inject-inline')
const htmlmin = require('gulp-htmlmin')
const del = require('del')

const css = () => {
  const plugins = [
    purgecss({
      content: ['src/index.html'],
      fontFace: true,
      whitelist: ['active', 'nav', 'toggle-sidebar', 'close-sidebar', 'permalink']
    }),
    cssnano({
      preset: ['default', { discardComments: { removeAll: true } }]
    }),
    autoprefixer()
  ]
  return src(['assets/default.css', 'assets/spacemacs-light.css', 'assets/spacemacs-doc.css'])
    .pipe(concatCss('style.css'))
    .pipe(postcss(plugins))
    .pipe(dest('dist'))
}

const js = () => {
  return src(['assets/jquery.slim.js', 'assets/scrollspy.js', 'assets/readtheorg.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
}

const favicon = () => {
  return src(['assets/favicon/*'])
    .pipe(dest('dist'))
}

const html = () => {
  return src('src/index.html')
    .pipe(injectInline())
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(dest('dist'))
}

const clean = () => {
  return del(['dist/style.css', 'dist/script.js'])
}

exports.default = series(parallel(css, js, favicon), html, clean)
exports.css = css
exports.js = js
exports.html = html
exports.clean = clean
