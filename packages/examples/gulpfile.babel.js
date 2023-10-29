const gulp = require('gulp');
const twig = require('gulp-twig');
const { watch } = require('gulp');

const twigSource = 'source/twig/*.twig';
const buildDir = './build';

const watcher = watch([twigSource]);

const twigTask = () =>
  gulp.src(twigSource).pipe(twig()).pipe(gulp.dest(buildDir));

watcher.on('change', () => {
  twigTask();
});

exports.default = gulp.series(twigTask);
