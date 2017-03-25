(function(){
  'use strict';

  angular.module('app')
    .controller('mainController', mainController);

  mainController.$inject = ['$scope', 'nhApi'];
  function mainController($scope, nhApi) {
    var vm = $scope.vm = {};
    vm.data = {};

    vm.get = get;

    activate();

    // ----------

    function activate() {
      init();
      reload();
    }

    function init() {
      console.log('Initialized');
      nhApi.balance().then(
        function (res) {
          vm.data = res;
          // RlpmAbamt
          console.log(vm.data);
        },
        function (error) {
          console.log('error');
        }
      );
    }

    function reload() {
    }

    function get() {

    }
  }
})();
