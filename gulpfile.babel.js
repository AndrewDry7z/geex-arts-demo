'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import csso from 'gulp-csso';
import connect from 'gulp-connect';

let paths = {
    mainSCSS: 'src/scss/main.scss',
    watchSCSS: 'src/scss/**/*.scss',
    mainScript: 'src/js/main.script.js',
    watchScripts: 'src/js/**/*'
}

gulp.task('js', () => {
    browserify(paths.mainScript)
        .transform('babelify', {
            global: true,
            only: /^(?:.*\/node_modules\/(?:a|b|c|d)\/|(?!.*\/node_modules\/)).*$/,
            presets: ["es2015"]
        })
        .bundle()
        .pipe(source('main.script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});


gulp.task('scss', function() {
    let plugins = [
        autoprefixer({browsers: ['last 1 version']})
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

gulp.task('watch', () => {
    gulp.watch(paths.watchSCSS, ['scss']);
    gulp.watch(paths.watchScripts, ['js']);
});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('script_compress', ['js', 'watch']);
gulp.task('sass_to_css', ['scss', 'watch']);
