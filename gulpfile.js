var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var chalk = require('chalk');
var gulpif = require('gulp-if');
var del = require('del');
var loadedConfig = require('./config.js');
var config = loadedConfig.paths();
var styleOpts = loadedConfig.styleOptions();
var vendorPaths = loadedConfig.vendor();


/*
    Gulp Task : Default
*/
gulp.task('default', ['help']);

/*
    Gulp Task : Start
*/

gulp.task('start', ['build', 'watch']);

/*
*****
*****
*****
*****
*****
*****
*****
*****
*****
    Gulp Task: Build
*/

gulp.task('build', ['vendors', 'sass', 'js','images','fonts']);


/*
    Gulp Task: Watcher
*/

gulp.task('watch', function() {
    gulp.watch(config.source + 'images/**/*', ['images']);
    gulp.watch(config.source + 'styles/**/*.scss', ['sass']).on('change', function(e) {
        log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
    gulp.watch(config.source + 'js/**/*', ['js']);
});

/*
    Gulp Task: Cleaner
*/

//Clean the build folder
gulp.task('clean', function() {
    log('----- Cleaning build folder -----');
    del([
        config.dest + '*'
    ]);
});


/*
    Gulp Task: Help View
*/


gulp.task('help', function() {
    console.log('');
    console.log('===== Help for DevTips Starter Kit =====');
    console.log('');
    console.log('Usage: gulp [command]');
    console.log('The commands for the task runner are the following.');
    console.log('-------------------------------------------------------');
    console.log('       clean: Removes all the compiled files on ./build');
    console.log('          js: Compile the JavaScript files');
    console.log('        sass: Compile the Sass styles');
    console.log('      images: Copy the newer to the build folder');
    console.log('     favicon: Copy the favicon to the build folder');
    console.log('     vendors: Copy the vendors to the build folder');
    console.log('       build: Build the project');
    console.log('       watch: Watch for any changes on the each section');
    console.log('       start: Compile and watch for changes (for dev)');
    console.log('        help: Print this message');
    console.log('');
});
/*
    Gulp Task: Bundle Js Files
*/

gulp.task('js', function() {
    if (config.env == 'development') {
        log('----- Compiling Javascript for Development -----');
        return gulp.src(config.source + 'js/**/*')
            .pipe($.jshint('.jshintrc'))
            .pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.jscs('.jscsrc'))
            .pipe($.concat('main.min.js'))
            .pipe(gulp.dest(config.dest + 'js'));
    } else {
        log('----- Compiling Javascript for Production -----');

        del([
            config.dest + 'js/*'
        ]);

        return gulp.src(config.js)
            .pipe($.concat('core.min.js'))
            .pipe($.size({ title: 'Javascript In Size' }))
            .pipe($.uglify())
            .pipe($.size({ title: 'Javascript Out Size' }))
            .pipe(gulp.dest(config.dest + 'js'));
    }
});


/*
    Gulp Task: Bundle Sass File
*/

gulp.task('sass', function() {
    log('----- Bundling Sass -----');
    return gulp.src(config.source + 'styles/main.scss')
        .pipe($.sassGlob())
        .pipe($.sass(styleOpts.sassOpt)).on('error', $.sass.logError)
       // .pipe($.size({ title: 'styles In Size' }))
        .pipe($.pleeease(styleOpts.pleeeaseOpt))
      //  .pipe($.size({ title: 'styles Out Size' }))
        .pipe($.concat('main.min.css'))
        .pipe(gulp.dest(config.dest + 'css'));
        //.pipe(browsersync.reload({ stream: true }));
});

/*
    Gulp Task: Copying Images
*/

gulp.task('images', function() {
    log('----- Copying Images -----');
    return gulp.src(config.source + 'images/**/*')
        .pipe($.newer('build/images'))
        .pipe($.imagemin())
        .pipe(gulp.dest(config.dest + 'images'));
});

gulp.task('fonts', function(){
        log('----- Copying Fonts -----');
    return gulp.src(vendorPaths.fonts)
        .pipe($.newer('build/fonts'))
        .pipe(gulp.dest(config.dest + 'fonts'));
});

/*
    Gulp Task : Bundle Bower Vendors CSS & JS
*/

gulp.task('vendors', ['vendor-styles', 'vendor-scripts']);

gulp.task('vendor-scripts', function() {
    return gulp.src(vendorPaths.js)
        .pipe($.concat('core.min.js'))
        .pipe(gulpif(config.env === 'production', $.uglify()))
        .pipe(gulp.dest(config.dest + 'js'))
});


gulp.task('vendor-styles', function() {
    return gulp.src(vendorPaths.css)
        .pipe($.concat('core.min.css'))
        .pipe(gulp.dest(config.dest + 'css'))
});



// Logger function using Chalk module
function log(msg, color) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                console.log(chalk.white.bgBlue(msg));
            }
        }
    } else {
        console.log(chalk.white.bgGreen(msg));
    }
}
