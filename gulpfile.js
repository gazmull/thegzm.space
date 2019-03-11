const gulp = require('gulp');
const sass = require('gulp-sass');
const pug  = require('gulp-pug');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');

const tsProject = ts.createProject('tsconfig.json');
const server = browserSync.create();

const paths = {
  src: 'src',
  build: 'build'
};

const projects = JSON.parse(require('fs').readFileSync(paths.build + '/assets/projects.json').toString());

const pugFiles = {
  src: paths.src + '/views/**/!(_)*.pug',
  build: paths.build,
};

const scssFiles = {
  src: paths.src + '/scss/index.scss',
  build: paths.build + '/css/',
};

const tsFiles = {
  build: paths.build + '/js/'
};

gulp.task('pug', () => {
  return gulp.src(pugFiles.src)
    .pipe(pug({
      locals: {
        projects
      },
      pretty: false
    }))
    .pipe(gulp.dest(pugFiles.build))
});

gulp.task('sass', () => {
  return gulp.src(scssFiles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(scssFiles.build))
    .pipe(browserSync.stream());
});

gulp.task('ts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(tsFiles.build))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('assets', () => {
  return gulp.src(paths.src + '/assets/**/*')
    .pipe(gulp.dest(paths.build + '/assets'))
});

function serve (done) {
  server.init({
    ghostMode: true,
    notify: false,
    server: {
      baseDir: paths.build
    },
    open: true
  });
  done();
}

function reload (done) {
  setTimeout(() => { browserSync.reload(); done(); }, 500);
}

const commonTasks = [ 'assets', 'pug', 'sass', 'ts' ];

function watch () {
  gulp.watch(paths.src, gulp.series(...commonTasks, reload));
}

gulp.task('default', gulp.series(...commonTasks, serve, watch));
gulp.task('build', gulp.series(...commonTasks));
