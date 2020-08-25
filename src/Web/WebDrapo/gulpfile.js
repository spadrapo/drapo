/// <binding BeforeBuild='beforeBuild' />
//"use strict";

var gulp = require('gulp'),
    gulp_concat = require('gulp-concat'),
    gulp_rename = require('gulp-rename'),
    gulp_watch = require('gulp-watch'),
    gulp_uglify = require('gulp-uglify'),
    gulp_tslint = require('gulp-tslint');

gulp.task('buildDrapoLib:tslint', function () {
    gulp.src('../../Middleware/Drapo/ts/*.ts')
        .pipe(gulp_tslint({
            configuration: '../../Middleware/Drapo/tslint.json',
            formatter: "verbose"
        }))
        .pipe(gulp_tslint.report());
});

gulp.task('buildDrapoLib:debug', function () {
    return gulp.src(['../../Middleware/Drapo/node_modules/jquery/dist/jquery.min.js', '../../Middleware/Drapo/node_modules/es6-promise/dist/es6-promise.auto.min.js', '../../Middleware/Drapo/node_modules/@aspnet/signalr/dist/browser/signalr.min.js', '../../Middleware/Drapo/js/*.js'])
        .pipe(gulp_concat('drapo.js'))
        .pipe(gulp.dest('../../Middleware/Drapo/lib'));
}); 

gulp.task('buildDrapoLib:release', function () {
    return gulp.src(['../../Middleware/Drapo/node_modules/jquery/dist/jquery.min.js', '../../Middleware/Drapo/node_modules/es6-promise/dist/es6-promise.auto.min.js', '../../Middleware/Drapo/node_modules/@aspnet/signalr/dist/browser/signalr.min.js', '../../Middleware/Drapo/js/*.js'])
        .pipe(gulp_concat('drapo.min.js'))
        .pipe(gulp.dest('../../Middleware/Drapo/lib'))
        .pipe(gulp_rename('drapo.min.js'))
        .pipe(gulp_uglify())
        .pipe(gulp.dest('../../Middleware/Drapo/lib'));
}); 

gulp.task('buildDrapoType', function () {
    return gulp.src(['../../Middleware/Drapo/js/*.d.ts'])
        .pipe(gulp_concat('index.d.ts'))
        .pipe(gulp.dest('../../Middleware/Drapo/lib'));
}); 

gulp.task('buildDrapoLib', ['buildDrapoLib:tslint', 'buildDrapoLib:release', 'buildDrapoLib:debug', 'buildDrapoType']);

gulp.task('beforeBuild', ['buildDrapoLib']);

gulp.task('watch:ts', function ()
{
    gulp.watch('../../Middleware/Drapo/js/*.js', ['buildDrapoLib']);
});

gulp.task('copyToOutput:BootstrapCSS', function ()
{
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('copyToOutput:BootstrapJS', function () {
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('copyToOutput:BootstrapFonts', function () {
    return gulp.src(['./node_modules/bootstrap/dist/fonts/*.*'])
        .pipe(gulp.dest('./wwwroot/fonts'));
});

gulp.task('copyToOutput', ['copyToOutput:BootstrapCSS', 'copyToOutput:BootstrapJS','copyToOutput:BootstrapFonts']);

gulp.task('publish', ['copyToOutput']);

gulp.task('watch', ['watch:ts']);

gulp.task('default', ['watch']);