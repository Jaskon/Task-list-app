var gulp			= require('gulp');
var gulpConcat		= require('gulp-concat');
var gulpSourcemaps	= require('gulp-sourcemaps');
var gulpUglify 		= require('gulp-uglify');

// Gulp concat and minify
gulp.task('scripts', function() {
	return gulp.src([
		'./../app/app.module.js',
		'./../app/app.js',
		'./../app/app.config.js',
		'./../app/tasksModel/tasksModel.factory.js',
		'./../app/mainPageComponent/mainPage.module.js',
		'./../app/mainPageComponent/mainPage.component.js',
		'./../app/taskListComponent/taskList.module.js',
		'./../app/taskListComponent/taskList.component.js'
	]).pipe(gulpConcat('gulped.js'))
	.pipe(gulpUglify())
	.pipe(gulpSourcemaps.write())
	.pipe(gulp.dest('./../app/gulped'));
});
gulp.task('default', ['scripts'], function() {
	console.log('gulp success');
});