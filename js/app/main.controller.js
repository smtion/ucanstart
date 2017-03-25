(function(){
  'use strict';

  angular.module('app')
    .controller('mainController', mainController);

  mainController.$inject = ['$scope'];
  function mainController($scope) {
    var vm = $scope.vm = {};

    activate();

    // ----------

    function activate() {
      init();
      reload();
    }

    function init() {
      console.log('Initialized');
    }

    function reload() {
    }
  }
})();
