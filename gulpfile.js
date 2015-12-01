const gulp = require('gulp');
const gutil = require('gulp-util');

const rename = require("gulp-rename");
const runSequence = require('run-sequence');
const markdown = require('gulp-markdown');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
  markdown: [
    './**/README.md',
    '!./node_modules/**',
    '!./origin/**',
  ],
  dest: './dist',
}

gulp.task('clean', () => {
  return del(paths.dest);
});

gulp.task('markdown', ['clean'], () => {
  return gulp.src(paths.markdown)
    .pipe(markdown())
    .pipe(rename({
      basename: 'index',
    }))
    .pipe(gulp.dest(paths.dest))
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: paths.dest,
    },
  });
});

gulp.task('default', () => {
  runSequence('markdown', 'serve', () => {
    gutil.log('done :)');
  });
});
