(function() {
  'use strict';

  angular.module('app')
    .config(httpConfig)
    .config(routeConfig);

  httpConfig.$inject = ['$httpProvider'];
  function httpConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    // // Initialize get if not there
    // if (!$httpProvider.defaults.headers.get) {
    //     $httpProvider.defaults.headers.get = {};
    // }
    //
    // // Disable caching ajax request for IE9
    // $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    // $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    //
    // $httpProvider.interceptors.push('httpInterceptor');
  }

  // routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  // function routeConfig($routeProvider, $locationProvider) {
  //   // $locationProvider.html5Mode(true);
  //   history.pushState ? $locationProvider.html5Mode(true) : $locationProvider.html5Mode(false);
  //   //
  //   // location.href = '/#/' + location.href.split('/').pop();
  //
  //   $routeProvider
  //     //.when('/', {templateUrl: 'html/test.html', controller: 'mainController', controllerAs: 'vm'})
  //     //.when('/userList', {templateUrl: 'views/userList.html', controller: 'userListCtrl'})
  //     .when('/', {templateUrl: 'html/main.html', controller: 'mainController', controllerAs: 'vm'})
  //     .when('/product', {templateUrl: 'html/product.html', controller: 'productController', controllerAs: 'vm'})
  //     .when('/choice', {templateUrl: 'html/choice.html', controller: 'choiceController', controllerAs: 'vm'})
  //     .otherwise({redirectTo: '/'});
  // }
  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    history.pushState ? $locationProvider.html5Mode(true) : $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'html/main.html',
        controller: 'mainController',
        controllerAs: 'vm'
      })
      .state('product', {
        url: '/product',
        templateUrl: 'html/product.html',
        controller: 'productController',
        controllerAs: 'vm'
      })
      .state('choice', {
        url: '/choice/:a',
        templateUrl: 'html/choice.html',
        controller: 'choiceController',
        controllerAs: 'vm'
      })
      .state('order', {
        url: '/order/:a',
        templateUrl: 'html/order.html',
        controller: 'orderController',
        controllerAs: 'vm'
      })
      ;
  }
})();
