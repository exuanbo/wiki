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
const injectInline = require('@exuanbo/gulp-inject-inline')
const htmlmin = require('gulp-htmlmin')

// functions
//
function preClean() {
  return del(['public'])
}

function postClean() {
  return del(['build'])
}

function css() {
  const plugins = [
    purgecss({
      content: ['./src/index.html'],
      fontFace: true,
      safelist: ['active', 'nav', 'toggle-sidebar', 'close-sidebar', 'permalink']
    }),
    autoprefixer(),
    cssnano({
      preset: ['default', { discardComments: { removeAll: true } }]
    })
  ]

  return src(['assets/css/default.css', 'assets/css/spacemacs-light.css', 'assets/css/spacemacs-doc.css'])
    .pipe(concatCSS('style.css'))
    .pipe(postcss(plugins))
    .pipe(dest('build'))
}

function js() {
  return src(['assets/js/jquery.slim.js', 'assets/js/scrollspy.js', 'assets/js/readtheorg.js'])
    .pipe(concat('script.js'))
    .pipe(uglify({ output: { comments: false } }))
    .pipe(dest('build'))
}

function static() {
  return src(['static/*', 'static/.gitattributes'])
    .pipe(dest('public'))
}

function html() {
  return src('src/index.html')
    .pipe(injectInline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('public'))
}

exports.default = series(preClean, parallel(css, js, static), html, postClean)
