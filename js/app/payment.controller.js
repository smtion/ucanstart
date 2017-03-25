(function(){
  'use strict';

  angular.module('app')
    .controller('paymentController', paymentController);

  paymentController.$inject = ['$scope'];
  function paymentController($scope) {
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
