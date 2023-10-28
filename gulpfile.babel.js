const gulp = require('gulp');
const twig = require('gulp-twig');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const { watch } = require('gulp');

const distSource = 'dist/**/*.*';
const twigSource = 'examples/twig/*.twig';
const postCssSource = 'examples/styles/*.css';
const scriptSource = 'examples/scripts/*.ts';
const assetsSource = 'examples/assets/**';
const buildDir = './build';

const watcher = watch([
  distSource,
  twigSource,
  postCssSource,
  scriptSource,
  assetsSource,
]);

const twigTask = () =>
  gulp.src(twigSource).pipe(twig()).pipe(gulp.dest(buildDir));

const postCSSTask = () =>
  gulp.src(postCssSource).pipe(postcss()).pipe(gulp.dest(buildDir));

const tsTask = () =>
  gulp
    .src('examples/scripts/page.ts')
    .pipe(ts({ outFile: 'page.js' }))
    .pipe(gulp.dest(buildDir));

const copyDistTask = () => gulp.src(distSource).pipe(gulp.dest(buildDir));
const copyAssetsTask = () => gulp.src(assetsSource).pipe(gulp.dest(buildDir));

watcher.on('change', () => {
  twigTask();
  postCSSTask();
  tsTask();
  copyDistTask();
  copyAssetsTask();
});

exports.default = gulp.series(
  twigTask,
  postCSSTask,
  tsTask,
  copyDistTask,
  copyAssetsTask,
);
