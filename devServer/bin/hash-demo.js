var gulp = require('gulp');
var RevAll = require('gulp-rev-all');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var useref = require('gulp-useref');


gulp.task('default', function () {

    var jsFilter = filter("**/*.js");
    var cssFilter = filter("**/*.css");
    var htmlFilter = filter('**/*.html');

    var assets = useref.assets();

    var revAll = new RevAll({

        //不重命名文件
        dontRenameFile: ['.html'] ,

        //无需关联处理文件
        dontGlobal: [ /^\/favicon.ico$/ ,'.bat','.txt'],

        //该项配置只影响绝对路径的资源
        prefix: 'http://s0.static.server.com'
    });

    return gulp.src(['staticPreprocessing/src/**'])

    //合并html里面的js/css
        .pipe(htmlFilter)
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(htmlFilter.restore())

        //压缩js
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())

        //压缩css
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore())

        //加MD5后缀
        .pipe(revAll.revision())

        //输出
        .pipe(gulp.dest('staticPreprocessing/dist'))

        //生成映射json文件
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('staticPreprocessing/dist'));
});

gulp.task('watch', function () {
    gulp.watch('staticPreprocessing/src/**', ['default']);
});
