(function(){
  'use strict';

  angular.module('app')
    .controller('productController', productController);

  productController.$inject = ['$scope', 'storage', '$state'];
  function productController($scope, storage, $state) {
    var vm = this;
    vm.product = {};
    vm.rewards = [];
    vm.order = order;
    activate();

    // ----------

    function activate() {
      init();
    }

    function init() {
      vm.product = storage.get('product');
      vm.rewards = [1, 2, 3, 4];
    }

    function order(index) {
      // $stateParams
      console.log(vm.rewards[index]);
      $state.go('order', {a: vm.rewards[index]});
    }
  }
})();
