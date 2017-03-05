var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var inlineNg2Template = require('gulp-inline-ng2-template');        // ?

gulp.task('default', [], function() {
    var external = [
        /*'@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/upgrade',
        'angular-in-memory-web-api',
        'systemjs',
        'core-js',
        'rxjs/Rx',
        'zone.js'*/
    ];
    var required = [
        /*'@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/upgrade',
        'angular-in-memory-web-api',
        'core-js',
        'rxjs/Rx',
        'zone.js'*/
    ];
    

    return browserify({
        basedir: '.',
        debug: true,
        entries: [
            '../app/firstTest.spec.ts'
        ],
        cache: {},
        packageCache: {}
    })
    .external(external)
    .require(required)
    .plugin(tsify)      // Typescript compile
    .transform('./ng2inlinetransform')
    .bundle()
    .pipe(source('bundle_tests.js'))      // Name of our final script
    //.pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())       // Minify
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("../app/gulped"));      // Place of our final script
});