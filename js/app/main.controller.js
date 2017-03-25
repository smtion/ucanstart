(function(){
  'use strict';

  angular.module('app')
    .controller('mainController', mainController);

  mainController.$inject = ['$scope', 'storage', 'nhApi'];
  function mainController($scope, storage, nhApi) {
    var vm = $scope.vm = {};
    vm.product = {};

    vm.get = get;

    activate();

    // ----------

    function activate() {
      init();
    }

    function init() {
      // console.log('Initialized');
      vm.product = storage.get('product');
      if (vm.product === null) {
        vm.product = {
          amount: 10,
          current: 2
        };
        storage.set('product', vm.product);
      }
      console.log(vm.product);
    }

    function reload() {
    }

    function get() {
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
  }
})();
