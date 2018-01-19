/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
(function (window, angular, undefined) {
    "use strict";
    var myapp = angular.module("myapp",[]);
    /**
     * 路由配置
     * App Module
     */
    myapp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide",
        function ($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {


            /******路由配置开始******/
            $stateProvider
            //测试开发
            .state("Login", {
                url: "/Login",
                templateUrl: "htmls/Login/Login.html"
            })


            ;

            /******路由配置结束******/



            //默认装置路由
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go("Login");
            });
            //是否使用全局controller
            $controllerProvider.allowGlobals();
            // H5模式configure html5 to get links working on jsfiddle
            //$locationProvider.html5Mode(true);

            // lazy controller, directive and service
            myapp.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                constant: $provide.constant,
                value: $provide.value
            };
            myapp.controller = $controllerProvider.register;
            myapp.directive = $compileProvider.directive;
            myapp.filter = $filterProvider.register;
            myapp.factory = $provide.factory;
            myapp.service = $provide.service;
            myapp.constant = $provide.constant;
            myapp.value = $provide.value;

        }]);

})(window, angular);
