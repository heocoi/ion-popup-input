var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var iife = require("gulp-iife");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("js", [], function() {
  return gulp.src(["src/ionPopupInput.js", "release/ionPopupInput.min.js"])
    .pipe(ngAnnotate())
    .pipe(concat("ionPopupInput.min.js"))
    .pipe(iife())
    .pipe(uglify())
    .pipe(gulp.dest("release"));
});

gulp.task("build", ["js"]);

gulp.task("default", ["build"]);
