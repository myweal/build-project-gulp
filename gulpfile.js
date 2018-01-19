'use strict';
var config = require('./gulp.conf');
var version_config = require("./config.json");
// == PATH STRINGS ========
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');

var vpm = require('./devServer/bin/vpm.js');
var clearVpm =require('./devServer/bin/vpm.js');
// == PIPE SEGMENTS ========
var pipes = {};
var options = {cwd: config.source, base: config.source};
pipes.copyStatic = function () {
	return gulp.src(config.copyRule, options).pipe(gulp.dest(config.product));
};
pipes.concatPreloadJsFiles = function () {
	return gulp.src(config.taskResource.jsFiles, options)
		.pipe(plugins.concat(config.taskResult.concat.allJs))
		.pipe(gulp.dest(config.build + '/lib'));
};
pipes.concatPreloadCssFiles = function () {
	return gulp.src(config.taskResource.cssFiles, options)
		.pipe(plugins.concat(config.taskResult.concat.allCss))
		.pipe(gulp.dest(config.build + '/css'));
};
pipes.minifyPreloadJsFiles = function () {
	return gulp.src(config.taskResource.jsFiles, options)
		.pipe(plugins.concat(config.taskResult.minify.allMinJs))
		.pipe(plugins.jshint())
		.pipe(plugins.uglify())
		.pipe(plugins.jshint())
		.pipe(gulp.dest(config.product + '/lib'));
};
pipes.minifyPreloadCssFiles = function () {
	return gulp.src(config.taskResource.cssFiles, options)
		.pipe(plugins.concat(config.taskResult.minify.allMinCss))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(config.product + '/css'));
};
pipes.compileTpl = function (mode) {
	return gulp.src(config.taskResource.template,options)
		.pipe(plugins.compileHandlebars({productMode:mode}))
		.pipe(plugins.rename('index.html'))
		.pipe(gulp.dest(config.product));
};
// build
pipes.copyStaticBuild = function () {
	return gulp.src(config.copyRule, options).pipe(gulp.dest(config.build));
};
pipes.compileTplBuild = function (mode) {
	return gulp.src(config.taskResource.template,options)
		.pipe(plugins.compileHandlebars({productMode:mode}))
		.pipe(plugins.rename('index.html'))
		.pipe(gulp.dest(config.build));
};


// == TASKS ========
gulp.task('version',function () {
    // 判断是否执行
    if(version_config.addVersion){
    	console.log("add versioning...");
        vpm();
    }
});
gulp.task('clean-version',function () {
    // 判断是否执行
    if(version_config.addVersion){
    	// true代码清空版本号
        vpm(true);
    }
});
// product
gulp.task('clean', function () { //clean dist directory
	return del.sync([config.product + '/**']);
});
gulp.task('copy',['clean','version'], function () { //copy file
	return pipes.copyStatic();
});
gulp.task('min',['copy'],function () { //copy file
	return es.merge(pipes.compileTpl(true),pipes.minifyPreloadCssFiles(),pipes.minifyPreloadJsFiles());
});
// build
gulp.task('build-clean', function () { //clean dist directory
	return del.sync([config.build + '/**']);
});
gulp.task('build-copy',['build-clean','version'], function () { //copy file
	return pipes.copyStaticBuild();
});

gulp.task('cat',['build-copy'],function () { //copy file
	return es.merge(pipes.compileTplBuild(),pipes.concatPreloadCssFiles(),pipes.concatPreloadJsFiles());
});
gulp.task('csslint', function () {
    return gulp.src(config.taskResource.cssFiles, options)
        .pipe(plugins.csslint())
        .pipe(plugins.csslint.formatter());
});
// dev start server
gulp.task('dev', function () {
	// start nodemon to auto-reload the dev server
	plugins.nodemon({
		script: 'server.js',
		ext: 'js',
		watch: ['devServer/'],
		env: {NODE_ENV: gulp.env.type||'development'}
	}).on('restart', function () {
		console.log('[nodemon] restarted dev server');
	});
});
//