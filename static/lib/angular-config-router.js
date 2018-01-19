var myApp = angular.module('myapp', ['ui.router', 'oc.lazyLoad']);

myApp.config(["$stateProvider", "$controllerProvider", "$urlRouterProvider", "$compileProvider", "$filterProvider", "$provide"
    , function ($stateProvider, $controllerProvider, $urlRouterProvider, $compileProvider, $filterProvider, $provide) {
        $stateProvider
            .state({
                name: 'hello',
                url: '/hello',
                templateUrl: 'htmls/hello/hello.html',
                controller: "helloCtrl",
                resolve: {
                    deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load("htmls/hello/hello.js");
                    }]
                }
            })
            .state({
                name: 'about',
                url: '/about',
                template: '<h3>Its the UI-Router hello world app!</h3>'
            })
            .state({
                name: 'welcome',
                url: '/welcome',
                templateUrl: 'htmls/welcome/welcome.html'
            });
        //是否使用全局controller
        $controllerProvider.allowGlobals();
        //默认装置路由
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("hello");
        });
        // get provider
        myApp.controller = $controllerProvider.register;
        myApp.directive = $compileProvider.directive;
        myApp.filter = $filterProvider.register;
        myApp.factory = $provide.factory;
        myApp.service = $provide.service;
        myApp.constant = $provide.constant;
        myApp.value = $provide.value;

        // 异步加载js
        /*myApp.loadControllerJs = function (controllerJs) {
         return function ($rootScope, $q) {
         var def = $q.defer(), deps = [];
         angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
         require(deps, function () {
         $rootScope.$apply(function () {
         def.resolve();
         });
         });
         return def.promise;
         }
         };*/
    }]);
