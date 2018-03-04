/**
 * Created by Aidan on 14/07/2017.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', ['watch']);

gulp.task('deploy-copy', function () {
    return gulp.src(
        [
            '!app/scss/**/*',
            'app/**/*',
        ])
        .pipe(gulp.dest('public'))
})
gulp.task('deploy-min-images', () =>
    gulp.src('public/images/*')
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 5 },
                {
                    verbose: true
                })
        ]))
        .pipe(gulp.dest('public/images/'))
);

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('css', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});
gulp.task('clean:dist', function () {
    return del.sync('dist');
});
gulp.task('default', function (callback) {
    runSequence(['sass', 'css', 'browserSync', 'watch'],
        callback
    );
});
gulp.task('watch', ['browserSync', 'sass', 'css'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', ['css']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('develop', ['sass', 'browserSync'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*html', browserSync.reload);
});