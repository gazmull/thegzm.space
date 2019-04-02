const gulp = require('gulp');
const sass = require('gulp-sass');
const postCss = require('gulp-postcss');
const pug  = require('gulp-pug');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const { sync: del } = require('del');
const { default: fetch } = require('node-fetch');

const tsProject = ts.createProject('tsconfig.json');
const server = browserSync.create();

const paths = {
  src: 'src',
  build: 'build'
};

const read = path => JSON.parse(require('fs').readFileSync(path).toString());
const me = (async () => {
  const response = await fetch('https://en.gravatar.com/gazmull.json');

  if (!response.ok) throw new Error('Response was not ok.');

  const json = await response.json();

  return json.entry[0];
})();
const projects = () => read(paths.src + '/assets/projects.json');

const pugFiles = {
  src: paths.src + '/views/**/!(_)*.pug',
  build: paths.build
};

const scssFiles = {
  src: paths.src + '/scss/index.scss',
  build: paths.build + '/css'
};

const tsFiles = {
  build: paths.build + '/js'
};

const terserFiles = {
  src: tsFiles.build + '/**/*.js',
  dest: tsFiles.build
};

gulp.task('pug', async () => {
  return gulp.src(pugFiles.src)
    .pipe(pug({
      locals: {
        me: await me,
        projects: projects()
      },
      pretty: false
    }))
    .pipe(gulp.dest(pugFiles.build))
    .pipe(server.stream());
});

gulp.task('sass', () => {
  return gulp.src(scssFiles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postCss([ autoprefixer() ]))
    .pipe(gulp.dest(scssFiles.build))
    .pipe(server.stream());
});

gulp.task('ts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(tsFiles.build))
    .pipe(server.stream());
});

gulp.task('terser', () => {
  return gulp.src(terserFiles.src)
    .pipe(terser({
      compress: true,
      mangle: true,
      toplevel: true,
      ecma: 6
    }))
    .pipe(gulp.dest(terserFiles.dest));
});

gulp.task('assets', () => {
  return gulp.src(paths.src + '/assets/**/*')
    .pipe(gulp.dest(paths.build + '/assets'));
});

gulp.task('clean', () => {
  del([ paths.build ]);

  return Promise.resolve(true);
});

function serve (done) {
  server.init({
    ghostMode: true,
    server: {
      baseDir: paths.build
    },
    reloadDelay: 1e3,
    open: true
  });
  done();
}

const commonTasks = [ 'assets', 'pug', 'sass', 'ts' ];

function watch () {
  gulp.watch(paths.src, gulp.series(...commonTasks));
}

gulp.task('default', gulp.series(...commonTasks, serve, watch));
gulp.task('build', gulp.series('clean', ...commonTasks, 'terser'));
