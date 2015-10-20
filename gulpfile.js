var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    cache       = require('gulp-cached'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify');
    sassLint    = require('gulp-sass-lint');

gulp.task('scss', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };

  return gulp.src('src/scss/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('site/public/resources/css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('site/public/resources/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "design"
        }
    });
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('site/public/resources/js'))
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'src/fonts'])
            .pipe(gulp.dest('site/public/resources'));
});

gulp.task('compress', function() {
  return gulp.src('src/js/vendor/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('site/public/resources/js/vendor'));
});

gulp.task('sass-lint', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('jshint', function() {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/*.js', ['jshint', 'js']);
  gulp.watch('src/img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('site/public/resources/img'));
});

gulp.task('default', ['browser-sync', 'js', 'fonts', 'compress', 'imgmin', 'scss', 'jshint', 'watch']);
