const gulp = require('gulp');
const twig = require('gulp-twig');
const postcss = require('gulp-postcss');
const { watch } = require('gulp');

const distSource = 'dist/**/*.*';
const twigSource = 'source/examples/twig/*.twig';
const postCssSource = 'source/examples/styles/*.css';
const buildDir = './build';

const watcher = watch([distSource, twigSource, postCssSource]);

const twigTask = () =>
  gulp.src(twigSource).pipe(twig()).pipe(gulp.dest(buildDir));

const postCSSTask = () =>
  gulp
    .src(postCssSource)
    .pipe(postcss([require('tailwindcss')]))
    .pipe(gulp.dest(buildDir));

const copyTask = () => gulp.src(distSource).pipe(gulp.dest(buildDir));

watcher.on('change', () => {
  twigTask();
  postCSSTask();
  copyTask();
});

exports.default = gulp.series(twigTask, postCSSTask, copyTask);
