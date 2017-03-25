(function(){
  'use strict';

  angular.module('app')
    .controller('rewardController', rewardController);

  rewardController.$inject = ['$scope'];
  function rewardController($scope) {
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
