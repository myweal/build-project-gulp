/************************************************配置************************************************/
// 源码、生产环境路径
var SOURCE_PATH = "./static/";
var BUILD_PATH = "./build/concat";//concat合并任务，不压缩
var PRODUCT_PATH = "./build/sample"; //是否压缩取决于任务,minify压缩,concat不压缩

// 读取要压缩的js和css文件列表
var jsFiles = require(SOURCE_PATH + 'lib/config.preload.js').jsFiles;
var cssFiles = require(SOURCE_PATH + "lib/config.preload.js").cssFiles;

//懒加载文件
var lazyFilesModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_Modules;
var lazyFilesNoModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_NoModules;

var TaskResult = {// lib/all.js   css/all.css
	concat: {
		allJs: 'all.js',
		allCss: 'all.css'
	},
	minify: {
		allMinJs: 'all.min.js',
		allMinCss: 'all.min.css'
	}
};
var copyRule = [/**通用文件**/
	'css/fonts/**', //字体文件
	'css/img/**', //图片文件
	//'data/**', //模拟数据,按需
	'fonts/**', //字体文件
	'htmls/**', //htmls
	'images/**',//图片资源
	'lib/template/**',//模板文件
	'lib/min/jquery-1.11.1.min.js', //index.html引入的js
	'lib/min/angular.min.js' //index.html引入的js
].concat(wrapLazy(lazyFilesModule, true) /**有模块懒加载文件**/).concat(wrapLazy(lazyFilesNoModule, false)/**无模块懒加载文件**/);
/************************************************结束************************************************/

module.exports = {
	source:SOURCE_PATH,
	product:PRODUCT_PATH,
	build:BUILD_PATH,
	taskResource:{
		jsFiles:jsFiles,
		cssFiles:cssFiles,
		template:'index.handlebars'
	},
	taskResult:TaskResult,
	copyRule:copyRule,
	dataPath:SOURCE_PATH+'/data'
};

function wrapLazy(files, hasMod) {
	var taskFiles = [];
	if (hasMod) {
		files.forEach(function (temp) {
			taskFiles.push.apply(taskFiles,temp.files);
		});
	} else {
		for (var key in files) {
			taskFiles.push.apply(taskFiles,files[key]);
		}
	}
	return taskFiles;
}
