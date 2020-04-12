const { src, dest, series, parallel } = require('gulp')

// clean
const del = require('del')

// css
const concatCSS = require('gulp-concat-css')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

// js
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default

// html
const injectInline = require('gulp-inject-inline')
const htmlmin = require('gulp-htmlmin')

// functions
//
function preClean() {
  return del(['build', 'dist'])
}

function postClean() {
  return del(['build'])
}

function css() {
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
    .pipe(concatCSS('style.css'))
    .pipe(postcss(plugins))
    .pipe(dest('build'))
}

function js() {
  return src(['assets/jquery.slim.js', 'assets/scrollspy.js', 'assets/readtheorg.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('build'))
}

function favicon() {
  return src(['assets/favicon/*'])
    .pipe(dest('dist'))
}

function html() {
  return src('src/index.html')
    .pipe(injectInline())
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(dest('dist'))
}

exports.default = series(preClean, parallel(css, js, favicon), html, postClean)
