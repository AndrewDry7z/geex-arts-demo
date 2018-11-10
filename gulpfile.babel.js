var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('autoprefixer'),
    connect = require('gulp-connect');

var paths = {
    mainSCSS: 'src/scss/main.scss',
    watchSCSS: 'src/scss/**/*.scss',
    mainScript: 'src/js/main.script.js',
    watchScripts: 'src/js/**/*',
    images: 'src/img/**/*',
    optimizedImages: 'assets/img'
}

gulp.task('scss', function () {
    var plugins = [
        autoprefixer({browsers: ['last 3 version']})
    ];
    return gulp.src(paths.mainSCSS)
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(csso({
            restructure: true,
            sourceMap: false,
            debug: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('assets/css'));
});
gulp.task('watch-scss', function () {
    gulp.watch(paths.watchSCSS, ['scss']);
});
gulp.task('scss-to-css', ['scss', 'watch-scss']);

gulp.task('js', function() {
    return gulp.src(paths.mainScript)
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});
gulp.task('watch-js', function () {
    gulp.watch(paths.watchScripts, ['js']);
});
gulp.task('script-compress', ['js', 'watch-js']);

gulp.task('img', function () {
    return gulp.src(paths.images)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(paths.optimizedImages));
});
gulp.task('watch-img', function () {
    gulp.watch(paths.images, ['img']);
});
gulp.task('images-compress', ['img', 'watch-img']);

gulp.task('connect', function() {
    connect.server();
});
