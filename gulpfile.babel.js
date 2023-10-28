const gulp = require('gulp');
const twig = require('gulp-twig');
const { watch } = require('gulp');

const watcher = watch(['source/twig/*.twig']);

const twigTask = () =>
  gulp.src('./source/twig/*.twig').pipe(twig()).pipe(gulp.dest('./build'));

watcher.on('change', (path, stats) => {
  twigTask();
});

exports.default = twigTask;
