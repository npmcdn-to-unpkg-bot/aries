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
    minifyHTML  = require('gulp-minify-html'),
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify');
    sassLint    = require('gulp-sass-lint');
    util        = require('gulp-util');
    clean       = require('gulp-clean');

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
    .pipe(gulp.dest('dist/resources/css'))
    .pipe(gulp.dest('site/public/resources/css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/resources/css'))
    .pipe(gulp.dest('site/public/resources/css'))
});

gulp.task('basscss', function() {
  var cssFiles = ['node_modules/basscss-addons/modules/colors/css/colors.css','node_modules/basscss-addons/modules/btn/css/btn.css','node_modules/basscss-addons/modules/btn-primary/css/btn-primary.css'];

  gulp.src(cssFiles)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/resources/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/resources/js'))
    .pipe(gulp.dest('site/public/resources/js'))
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'src/fonts'])
            .pipe(gulp.dest('dist/resources'));
});

gulp.task('compress', function() {
  return gulp.src('src/js/vendor/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/resources/js/vendor'));
});

gulp.task('sass-lint', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('minify-html', function() {
    var opts = {
      comments:true,
      spare:true
    };

  gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'src/fonts/**/*.{eot,svg,ttf,woff,woff2}'])
            .pipe(gulp.dest('dist/resources/fonts/'));
});

// Images
gulp.task('images', function() {
    return gulp.src([
                    'assets/*.{jpg,png}'])
            .pipe(gulp.dest('dist/assets/'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/*.js', ['jshint', 'js']);
  gulp.watch('./*.html', ['minify-html']);
  gulp.watch('src/img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/resources/img'))
        .pipe(gulp.dest('site/public/resources/img'));
});

gulp.task('default', ['browser-sync', 'minify-html', 'js', 'fonts', 'compress', 'imgmin', 'scss', 'jshint', 'watch']);
