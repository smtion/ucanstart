(function() {
  'use strict';

  angular.module('app')
    .directive('spinner', spinner);

  spinner.$inject = [];
  function spinner() {
    var directive = {
      restrict: 'AE',
      link: link,
      scope: {
        isLoading: '=',
        size: '@'
      },
      templateUrl: 'js/app/spinner.directive.html'
    };

    return directive;

    function link(scope, el, attr) {
      // Initialize
      var opts = {lines: 13, length: 8, width: 2, radius: 10};
      scope.height = "40px";

      switch (scope.size) {
        case "xs" : opts = {lines: 13, length: 4, width: 1, radius: 5}; scope.height = "20px";
          break;
        case "sm" : opts = {lines: 13, length: 8, width: 2, radius: 10}; scope.height = "40px";
          break;
        case "lg" : opts = {lines: 13, length: 12, width: 4, radius: 15}; scope.height = "60px";
          break;
      }

      new Spinner({color:'#777', lines: opts.lines, length: opts.length, width: opts.width, radius: opts.radius}).spin(el[0].querySelector('.spinner'));
    }
  }
})();
