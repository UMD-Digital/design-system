const gulp = require('gulp');
const twig = require('gulp-twig');

const twigSource = 'source/twig/*.twig';
const buildDir = './build';

const twigTask = () =>
  gulp.src(twigSource).pipe(twig()).pipe(gulp.dest(buildDir));

exports.default = gulp.series(twigTask);
