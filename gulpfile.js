var gulp = require('gulp');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task("delete", function() {
    return gulp.src("bin", {allowEmpty: true})
    .pipe(clean())
    .pipe(gulp.src("dist", {allowEmpty: true}))
    .pipe(clean())
});

gulp.task("compile", function () {
        return gulp.src("src/js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("./bin"))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.src("src/index.html"))
        .pipe(gulp.dest("./dist/"))
});

gulp.task('watch', function() {
    var tasks = gulp.series('delete', 'compile');
    gulp.watch('src/*', function(cb) {
        tasks();
        cb();
    });
    gulp.watch('src/js/*', function(cb) {
        tasks();
        cb();
    });
});

gulp.task('build', function(cb) {
    var tasks = gulp.series('delete', 'compile');
    tasks();
    cb();
});