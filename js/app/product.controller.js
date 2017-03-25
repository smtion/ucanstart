(function(){
  'use strict';

  angular.module('app')
    .controller('productController', productController);

  productController.$inject = ['$scope'];
  function productController($scope) {
    var vm = this;
    vm.product = {};
    
    activate();

    // ----------

    function activate() {
      init();
      reload();
    }

    function init() {
      vm.product = storage.get('product');
    }

    function reload() {
    }
  }
})();
