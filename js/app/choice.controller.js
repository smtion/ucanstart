(function(){
  'use strict';

  angular.module('app')
    .controller('choiceController', choiceController);

  choiceController.$inject = ['$scope', 'storage', 'nhApi', '$stateParams'];
  function choiceController($scope, storage, nhApi, $stateParams) {
    var vm = this;
    vm.amount = $stateParams.q;
    vm.balance = 0;
    vm.getBalance = getBalance;

    activate();

    // ----------

    function activate() {
      init();
      getBalance();
    }

    function init() {
    }

    function getBalance() {
      nhApi.balance().then(
        function (res) {
          vm.balance = res.RlpmAbamt;
        },
        function (error) {
          console.log('error');
        }
      );
    }
  }
})();
