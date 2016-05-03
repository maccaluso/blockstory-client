var	gulp = require('gulp'),     
		sass = require('gulp-ruby-sass') 
		notify = require("gulp-notify") 
		path = require('path'),
		fs = require('fs'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		ngAnnotate = require('gulp-ng-annotate'),
		gutil = require('gulp-util'),
		gulpFilter = require('gulp-filter'),
		minifyCss = require('gulp-minify-css');
		mainBowerFiles = require('main-bower-files');

var config = {
	 sassPath: './sass',
	 bowerDir: './bower_components' ,
	appDir: './app',
	appJs: [
	'./app/**/*.module.js',
	'./app/**/*.js',
	'!./app/core/core.constants.js'
	],
	constantsJs: './app/core/core.constants.js'
}

gulp.task('bower', function() {
	var jsFilter = gulpFilter(['**/*.js'], {restore: true})
	var cssFilter = gulpFilter(['**/*.css'], {restore: true})

	return gulp.src(mainBowerFiles({
		bowerDirectory: config.bowerDir,
		bowerJson: './bower.json',
		overrides: {
            bootstrap: {
                main: [
                    './dist/js/bootstrap.js',
                    './dist/css/*.min.*',
                    './dist/fonts/*.*'
                ]
            }
        }
	}))
	.pipe(jsFilter)
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(concat('vendor.min.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(jsFilter.restore)
	.pipe(cssFilter)
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(concat('vendor.min.css'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(cssFilter.restore)
})

gulp.task('css', function() { 
	return sass( 
		config.sassPath + '/style.scss', 
		{ 
			style: 'compressed'
		}
	).on(
		'error',
		notify.onError(function(error){
			return "Error: " + error.message;
		})
	)
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('app',function () {
	return gulp.src(config.appJs)
	.pipe(ngAnnotate().on('error', onAppError))
	.pipe(uglify().on('error', onAppError))
	.pipe(concat("app.min.js"))
	.pipe(gulp.dest('./dist/js'));
})
function onAppError(err){
	console.log(err);
	this.emit('end');
}

gulp.task('bs-config-file',function(){
	return gulp.src(config.constantsJs)
	.pipe(rename('bs-config.js'))
	.pipe(gulp.dest('./dist/js'));
})

gulp.task('templates', function() {
    gulp.src( config.appDir + '/blocks/**/*.html' )
    .pipe( gulp.dest('./dist/templates/blocks') );
});

gulp.task('watch', function() {
	gulp.watch( config.bowerDir + '/**/*.*', ['bower'] ); 
	  gulp.watch( config.sassPath + '/**/*.scss', ['css'] ); 
	gulp.watch( config.appDir + '/**/*.js', ['app'] ); 
	gulp.watch( config.appDir + '/blocks/**/*.html', ['templates'] ); 
});

gulp.task('default', ['bower', 'css', 'app', 'bs-config-file', 'templates', 'watch']);