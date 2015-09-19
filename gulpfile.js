var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    scsslint    = require('gulp-scss-lint'),
    cache       = require('gulp-cached'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify');


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

  return gulp.src('site/public/resources/scss/main.scss')
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
            baseDir: "site/public/"
        }
    });
});

gulp.task('js', function() {
  gulp.src('site/public/resources/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('site/public/resources/js/min'))
});

gulp.task('compress', function() {
  return gulp.src('site/public/resources/js/vendor/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('site/public/resources/js/vendor/min'));
});

gulp.task('scss-lint', function() {
  gulp.src('site/public/resources/scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});


gulp.task('jshint', function() {
  gulp.src('site/public/resources/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('site/public/resources/scss/**/*.scss', ['scss']);
  gulp.watch('site/public/resources/js/*.js', ['jshint', 'js']);
  gulp.watch('site/public/resources/img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('site/public/resources/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('site/public/resources/img'));
});

gulp.task('default', ['browser-sync', 'js', 'compress', 'imgmin', 'scss', 'watch']);
