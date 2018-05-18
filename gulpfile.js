/**
 * Created by Administrator on 2017/6/1 0001.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    ignore = require('gulp-ignore'),
    ejs = require('gulp-ejs'),
    fileinclude = require('gulp-file-include'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');

gulp.task('less', function () {
    return gulp.src('model/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('model/css'));
});
gulp.task('css', function () {
    return gulp.src(['model/**/*.css', '!model/fonts/*'])
        .pipe(gulp.dest('src'));
});
gulp.task('img', function () {
    return gulp.src(['model/images/**/*.+(png|jpg|gif|svg)', '!model/fonts/*'])
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('src/images'))
});
gulp.task('js', function () {
    return gulp.src(['model/**/*.js', '!model/fonts/*'])
        .pipe(gulp.dest('src'));
});
gulp.task('copyfonts', function () {
    return gulp.src('./model/fonts/*')
        .pipe(gulp.dest('src/fonts'))
});
gulp.task('copyjson', function () {
    return gulp.src('./model/js/*.json')
        .pipe(gulp.dest('src/js'))
});
gulp.task('html', function () {
    var options = {};
    return gulp.src('model/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(ejs().on(
            'error', gutil.log
        ))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('src'));
});
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
    })
});
gulp.task('watch', function () {
    gulp.watch("model/less/**/*.less", ["less"]);
    gulp.watch(['model/**/*.css', '!model/fonts/*'], ["css"]);
    gulp.watch(['model/**/*.js', '!model/fonts/*'], ["js"]);
    gulp.watch('model/*.html', ['html']);
});

gulp.task('default', ['less', 'css', 'img', 'js', 'copyfonts', 'copyjson', 'html', 'browserSync', 'watch']);
