var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

gulp.task('default', [], function() {
	var external = [
		'@angular/common',
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
		'zone.js'
	];

    return browserify({
        basedir: '.',
        debug: true,
        entries: [
        	'../app/bootstrap.ts'
        ],
        cache: {},
        packageCache: {}
    })
    .external(external)
    .plugin(tsify)		// Typescript compile
    .bundle()
    .pipe(source('bundle_app.js'))		// Name of our final script
    //.pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())		// Minify
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("../app/gulped"));		// Place of our final script
});