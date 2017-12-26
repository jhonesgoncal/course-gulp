var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var cssLint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default',['copy'] ,function(){
	gulp.start('build-img', 'usemin');
})

gulp.task('copy',['clean'], function(){
	return gulp.src('src/**/*')
		       .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
	return gulp.src('dist')
		       .pipe(clean());
});

gulp.task('build-img', function(){
	gulp.src('dist/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function(){
	gulp.src('dist/**/*.html')
	.pipe(usemin({
		'js': [uglify],
		'css': [autoprefixer , cssmin]
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: 'src',
			proxy: 'localhost:3000'
		}
	});
	gulp.watch('src/js/*.js').on('change', function(event){
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));
	});

	gulp.watch('src/css/*.css').on('change', function(event){
		gulp.src(event.path)
			.pipe(cssLint())
			.pipe(cssLint.formatter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
	
});

