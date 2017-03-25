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
      // console.log(vm.rewards[index]);
      if (vm.product.amount == vm.product.current) {
        alert('모집 마감되었습니다.');
        return;
      }
      if (vm.rewards[index] > vm.product.amount - vm.product.current) {
        alert('목표액을 초과하여 신청할 수 없습니다.');
        return;
      }
      $state.go('order', {a: vm.rewards[index]});
    }
  }
})();
