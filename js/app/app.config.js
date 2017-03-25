(function() {
  'use strict';

  angular.module('app')
    .config(httpConfig);

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
})();