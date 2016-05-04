//pacakage vars
var pkg = require('./package.json');

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
    deploy      = require('gulp-gh-pages'),
    notify      = require('gulp-notify'),
    changed     = require('gulp-changed'),
    favicons    = require('gulp-favicons'),
    fontello    = require('gulp-fontello'),
    print       = require('gulp-print'),
    replace     = require('gulp-replace'),
    csslint     = require('gulp-csslint'),
    newer       = require('gulp-newer'),
    log         = require('fancy-log'),
    chalk       = require('chalk'),
    jsonminify = require('gulp-jsonminify'),
    critical    = require('critical');

    var onError = function(err) {
        console.log(err);
    }

// The SCSS that is compiled down to build/css/main.min.css
var scssGlob = [
        'src/scss_src/main.scss'
    ];

// The individual CSS used on the site, to be minimized down to build/css/
var cssIndividualGlob = [
        'src/css_src/*.css',
    ];

// The page templates and their URLs for generating criticalCSS; pkg.site_url is prepended to  'url'
    criticalGlob = [
        { url: "", template: "index" },
        { url: "about", template: "about" },
        { url: "projects/index", template: "projects/index" },
        { url: "projects/fitbit-ces-2016", template: "projects/_entry" },
        { url: "services/index", template: "services/index" },
        { url: "events", template: "services/events" },
        { url: "animation", template: "services/animation" },
        { url: "webdesign", template: "services/webdesign" },
        { url: "articles/index", template: "articles/index" },
        { url: "articles/year-in-review-2015", template: "articles/_entry" },
        { url: "contact", template: "contact" },
        { url: "login", template: "login" },
        { url: "404", template: "404" },
        { url: "403", template: "403" },
        { url: "preview/index", template: "preview/index" },
        { url: "preview/test", template: "preview/_entry" },
    ];

// site-icons that need to be copied to the server root
var siteIconGlob = [
        pkg.dist_path + 'resources/img/site-icon/favicon.ico',
    ];

// The fonts that are used on the site
var fontsGlob = [
        'src/fonts_src/plutosans/PlutoSansBold*.{eot,woff,ttf,woff2,svg}',
        'src/fonts_src/plutosans/PlutoSansMedium*.{eot,woff,ttf,woff2,svg}',
        'src/fonts_src/plutosans/PlutoSansRegular*.{eot,woff,ttf,woff2,svg}',
        'src/fonts_src/elanawebbasic/elenawebbasicregular-webfont*.{eot,woff,ttf,woff2,svg}',
        'src/fonts_src/elanawebbasic/elenawebbasicbold-webfont*.{eot,woff,ttf,woff2,svg}',
        'src/fonts_src/fontello/font/*.{eot,woff,ttf,woff2,svg}',
        'bower_components/slick.js/slick/fonts/*.{eot,woff,ttf,woff2,svg}',
    ];

// All of the CSS that should be combined into the site-wide CSS
var cssCombinedGlob = [
        pkg.build_path + 'css/gridset.min.css',
        pkg.build_path + 'css/main.min.css',
    ];

// The JS that the site uses, to be uglified into build/js
var jsIndividualGlob = [
        'src/js_src/*.js',
        'bower_components/requirejs/require.js',
        'bower_components/requirejs-plugins/src/async.js',
        'bower_components/fontfaceobserver/fontfaceobserver.js',
        'bower_components/loadcss/src/loadCSS.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/picturefill/dist/picturefill.min.js',
        'bower_components/fitvids/jquery.fitvids.js',
        'bower_components/flexnav/js/jquery.flexnav.min.js',
        'bower_components/lazysizes/lazysizes.min.js',
        'bower_components/video/dist/jquery.vide.min.js',
        'bower_components/threejs/build/three.min.js',
        'bower_components/threejs/examples/js/Detector.js',
        'bower_components/threejs/examples/js/controls/OrbitControls.js',
        'bower_components/dropzone/dist/dropzone-amd-module.js',
        'bower_components/pushy/js/pushy.min.js',
        'bower_components/prism/prism.js',
        'bower_components/prism/components/prism-twig.js',
        'bower_components/prism/components/prism-php.js',
        'bower_components/prism/components/prism-bash.js',
    ];

// The JSON that the site uses, to be uglified into public/json
var jsonIndividualGlob = [
        'src/json_src/*.json',
    ];

// The JS that ends up getting inlined into the HTML itself
var jsInlineGlob = [
        pkg.build_path + 'js/require.min.js',
        pkg.build_path + 'js/fontfaceobserver.min.js',
        pkg.build_path + 'js/loadCSS.min.js',
        pkg.build_path + 'js/asyncload_site_fonts.min.js',
        pkg.build_path + 'js/require-config.min.js',
    ];

// The public JS loaded on the site
var jsPublicGlob = [
        pkg.build_path + 'js/scripts.min.js',
        pkg.build_path + 'js/async.min.js',
        pkg.build_path + 'js/jquery.min.js',
        pkg.build_path + 'js/picturefill.min.js',
        pkg.build_path + 'js/jquery.fitvids.min.js',
        pkg.build_path + 'js/jquery.flexnav.min.js',
        pkg.build_path + 'js/modernizr-2.6.2.min.js',
        pkg.build_path + 'js/lazysizes.min.js',
        pkg.build_path + 'js/jquery.vide.min.js',
        pkg.build_path + 'js/three.min.js',
        pkg.build_path + 'js/Detector.min.js',
        pkg.build_path + 'js/OrbitControls.min.js',
        pkg.build_path + 'js/dropzone-amd-module.min.js',
        pkg.build_path + 'js/pushy.min.js',
        pkg.build_path + 'js/Pintura.min.js',
    ];

// The JS that is combined to make the custom prism.js build
var jsPrismGlob = [
        pkg.build_path + 'js/prism.min.js',
        pkg.build_path + 'js/prism-twig.min.js',
        pkg.build_path + 'js/prism-php.min.js',
        pkg.build_path + 'js/prism-bash.min.js',
    ];

// Compile the SCSS to build/css
gulp.task('scss', function() {
    log("-> Building SCSS");
    var onError = function(err) {
        notify.onError({
            title:    "Gulp",
            subtitle: "Failure!",
            message:  "Error: <%= error.message %>",
            sound:    "Beep"
        })(err);
        this.emit('end');
    };

    return gulp.src(scssGlob)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(prefix({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(pkg.build_path + 'css/'));
});

//csslint task
gulp.task('csslint', function() {
    return gulp.src(cssIndividualGlob)
        .pipe(plumber({errorHandler: onError}))
        .pipe(prefix({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
        .pipe(csslint({ lookup: false }))
        .pipe(csslint.reporter());
});

//css-individual task
gulp.task('css-individual', function() {
    log("-> Building invidual css");
    return gulp.src(cssIndividualGlob)
        .pipe(plumber({errorHandler: onError}))
        .pipe(newer({ dest: pkg.build_path + 'css', ext: '.min.css' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(prefix({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.build_path + 'css/'));
});

//css task
gulp.task('css', ['scss', 'css-individual'], function() {
    log("-> Building site.combined.min.css");
    return gulp.src(cssCombinedGlob)
        .pipe(concat('site.combined.min.css'))
        .pipe(gulp.dest(pkg.dist_path + 'resources/css/'));
});

//json individual task
gulp.task('json-uglify', function() {
    log("-> Uglifying individual json");
    return gulp.src(jsonIndividualGlob)
        .pipe(plumber({errorHandler: onError}))
        .pipe(newer({ dest: pkg.dist_path + 'json', ext: '.min.json' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(jsonminify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.dist_path + 'resources/json/'));
});


//js individual task
gulp.task('js-individual', function() {
    log("-> Copying individual js");
    return gulp.src(jsIndividualGlob)
        .pipe(plumber({errorHandler: onError}))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.build_path + 'js/'));
});

//js individual task
gulp.task('js-uglify', ['js-individual', 'json-uglify'], function() {
    log("-> Uglifying individual js");
    return gulp.src(['build/js/*.js', '!build/js/*.min.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(newer({ dest: pkg.build_path + 'js', ext: '.min.js' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.build_path + 'js/'));
});

// inline js task
gulp.task('js-inline', ['js-uglify'], function() {
    log("-> Copying inline js");
    return gulp.src(jsInlineGlob)
        .pipe(gulp.dest(pkg.template_path + '_inlinejs'));
});

// js-prism task
gulp.task('js-prism', function() {
    log("-> Building Prism js");
    return gulp.src(jsPrismGlob)
        .pipe(concat('prism.min.js'))
        .pipe(gulp.dest(pkg.dist_path + 'resources/js/'));
});

// js task
gulp.task('js', ['js-inline', 'js-prism'], function() {
    log("-> Building js");
    return gulp.src(jsPublicGlob)
        .pipe(gulp.dest(pkg.dist_path + 'resources/js/'));
});

//favicons-generate task
gulp.task('favicons-generate', function() {
    log("-> Generating favicons");
    return gulp.src("src/img_src/favicon_src.png").pipe(favicons({
        appName: pkg.name,
        appDescription: pkg.description,
        developerName: pkg.author,
        developerURL: pkg.site_url,
        background: "#FFFFFF",
        path: "/resources/img/site-icon/",
        url: pkg.site_url,
        display: "standalone",
        orientation: "portrait",
        version: pkg.version,
        logging: false,
        online: false,
        html: pkg.build_path + "html/favicons.html",
        replace: true,
        icons: {
            android: false,              // Create Android homescreen icon. `boolean`
            appleIcon: true,            // Create Apple touch icons. `boolean`
            appleStartup: false,         // Create Apple startup images. `boolean`
            coast: true,                // Create Opera Coast icon. `boolean`
            favicons: true,             // Create regular favicons. `boolean`
            firefox: true,              // Create Firefox OS icons. `boolean`
            opengraph: false,            // Create Facebook OpenGraph image. `boolean`
            twitter: false,              // Create Twitter Summary Card image. `boolean`
            windows: true,              // Create Windows 8 tile icons. `boolean`
            yandex: true                // Create Yandex browser icon. `boolean`
        }
    })).pipe(gulp.dest(pkg.dist_path + 'resources/img/site-icon/'));
});

//copy favicons task
gulp.task('favicons', ['favicons-generate'], function() {
    log("-> Copying favicon.ico");
    return gulp.src(siteIconGlob)
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.dist_path + ''));
});

//generate-fontello task
gulp.task('generate-fontello', function() {
    log("-> Generating Fontello font");
    return gulp.src('src/fonts_src/fontello/config.json')
        .pipe(fontello())
        .pipe(print())
        .pipe(gulp.dest('src/fonts_src/fontello/'))
});

//fontello task
gulp.task('fontello', ['generate-fontello'], function() {
    log("-> Copying & modifying _fontello.css");
    return gulp.src(['src/fonts_src/fontello/css/dnb-icons.css'])
        .pipe(replace('../font/', '{{ baseUrl }}resources/fonts/'))
        .pipe(rename({ basename: '_fontello' }))
        .pipe(rename({ extname: '.twig' }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.template_path + '_inlinecss/'));
});

//copy fonts task
gulp.task('fonts', ['fontello'], function() {
    log("-> Copying fonts");
    return gulp.src(fontsGlob)
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(pkg.dist_path + 'resources/fonts/'));
});

//imagemin task
gulp.task('imagemin', function() {
    log("-> Minimizing images");
    return gulp.src(pkg.dist_path + 'resources/img/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'resources/img/'));
});

// Gross, but imagemin didn't like the deep paths, apparently

// articlesmin task
gulp.task('articlesmin', function() {
    log("-> Minimizing assets: articles");
    return gulp.src(pkg.dist_path + 'assets/articles/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/articles/'));
});

// clientsmin task
gulp.task('clientsmin', function() {
    log("-> Minimizing assets: clients");
    return gulp.src(pkg.dist_path + 'assets/clients/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/clients/'));
});

// homepagemin task
gulp.task('homepagemin', function() {
    log("-> Minimizing assets: homepage");
    return gulp.src(pkg.dist_path + 'assets/homepage/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/homepage/'));
});

// pagesmin task
gulp.task('pagesmin', function() {
    log("-> Minimizing assets: pages");
    return gulp.src(pkg.dist_path + 'assets/pages/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/pages/'));
});

// previewsmin task
gulp.task('previewsmin', function() {
    log("-> Minimizing assets: previews");
    return gulp.src(pkg.dist_path + 'assets/previews/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/previews/'));
});

// projectsmin task
gulp.task('projectsmin', function() {
    log("-> Minimizing assets: projects");
    return gulp.src(pkg.dist_path + 'assets/projects/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/projects/'));
});

// servicesmin task
gulp.task('servicesmin', function() {
    log("-> Minimizing assets: services");
    return gulp.src(pkg.dist_path + 'assets/services/**')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 7,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(pkg.dist_path + 'assets/services/'));
});

// assetmin task
gulp.task('assetmin', ['articlesmin', 'clientsmin', 'homepagemin', 'pagesmin', 'previewsmin', 'projectsmin', 'servicesmin'], function() {
    log("-> Minimizing assets");
});

// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
    if (data.length > 0) {
        var loop = function(data, i, processData, done) {
            processData(data[i], i, function() {
                if (++i < data.length) {
                    loop(data, i, processData, done);
                } else {
                    done();
                }
            });
        };
        loop(data, 0, processData, done);
    } else {
        done();
    }
}

// Process the critical path CSS one at a time
function processCriticalCSS(element, i, callback) {
    var criticalSrc = pkg.site_url + element.url;
    var criticalDest = pkg.template_path + element.template + '_critical.min.css';

    log("-> Generating critical CSS: " + chalk.cyan(criticalSrc) + " -> " + chalk.magenta(criticalDest));
    critical.generate({
        src: criticalSrc,
        dest: criticalDest,
        inline: false,
        ignore: ['a.tile', '.tile', '.tile-1', '.tile-2','.tile-3'],
        base: pkg.dist_path,
        css: [
            pkg.dist_path + 'resources/css/site.combined.min.css',
        ],
        minify: true,
        width: 1200,
        height: 1200
        }, function (err, output) {
        callback();
    });
}

//critical css task
gulp.task('criticalcss', ['css'], function (callback) {
    doSynchronousLoop(criticalGlob, processCriticalCSS, function () {
// all done
        callback();
    });
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "site/public/"
        }
    });
});
// Compress and minify images to reduce their file size
gulp.task('images', function() {
	var imgSrc = 'src/img/**/*',
		imgDst = 'site/public/resources/img';

	return gulp.src(imgSrc)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('scripts', function() {
  gulp.src(['src/js/plugins.js', 'src/js/scripts.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('site/public/resources/js/'))
});

gulp.task('vendor', function() {
  return gulp.src('src/js/vendor/*.js')
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('site/public/resources/js'))
    .pipe(reload({stream:true}));
});

gulp.task('scss-lint', function() {
  gulp.src('src/scss_src/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});

gulp.task('jshint', function() {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss_src/**/*.scss', ['scss']);
  gulp.watch('src/js/*.js', ['jshint', 'js']);
  // gulp.watch('site/public/*.html', ['minify-html']);
  gulp.watch('src/img/**/*', ['images']);
});

gulp.task('default', ['css', 'js']);
