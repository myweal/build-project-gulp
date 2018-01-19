/**
 * 配置插件懒加载资源路径[files字段]、懒加挂插件模块名称[name字段]。
 * 使用字符串进行调用，如ng-lazy-load="['ui.grid']"
 */
var $vLazyLoad_Modules = [{
    name: 'ui.grid',
    files: ['lib/plugins/ui-grid/ui-grid.min.js', 'lib/plugins/ui-grid/ui-grid.min.css', 'lib/plugins/ui-grid/ui-grid.bootstrap.css']
}];

/**
 * 仅仅配置插件懒加载资源路径，非模块，name随意。
 * 使用变量进行调用，如ng-lazy-load="[_iscroll]"
 */
var $vLazyLoad_NoModules = {
    _iscroll: ['lib/plugins/iscroll/iscroll.min.js', 'lib/plugins/iscroll/iscroll.css'],
};

if (typeof(exports) != "undefined") {
    exports.lazyLoad_Modules=$vLazyLoad_Modules;
    exports.lazyLoad_NoModules=$vLazyLoad_NoModules;
} else {
    angular.module('myapp').config(['$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: true,
                events: true,
                disableCache: false, //default false
                modules: $vLazyLoad_Modules
            });
        }
    ]).run(['$rootScope',
        function($rootScope) {
            angular.extend($rootScope, $vLazyLoad_NoModules);
        }
    ]);
}
