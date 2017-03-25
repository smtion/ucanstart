(function(){
  'use strict';

  angular.module('app')
    .controller('orderController', orderController);

  orderController.$inject = ['$scope', 'storage', 'nhApi', '$stateParams'];
  function orderController($scope, storage, nhApi, $stateParams) {
    var vm = this;
    vm.amount = $stateParams.a;
    vm.balance = 0;
    vm.paymentMethod = null;
    vm.isLoading = false;
    vm.isSubmitted = false;
    vm.agreement = false;
    vm.getBalance = getBalance;
    vm.pay = pay;

    activate();

    // ----------

    function activate() {
      init();
    }

    function init() {
      if (vm.amount <= 0) {
        console.log('Error');
      }
    }

    function getBalance() {
      vm.isLoading = true;

      nhApi.balance().then(
        function (res) {
          vm.balance = res.RlpmAbamt;
          vm.isLoading = false;
        },
        function (error) {
          console.log('error');
          vm.isLoading = false;
        }
      );
    }

    function pay() {
      vm.isSubmitted = true;

      nhApi.withdraw(vm.amount).then(
        function (res) {
          if (res.Rpcd == '0000') {
            alert("결제가 완료되었습니다.");
          }
          vm.isSubmitted = false;
        },
        function (res) {
          alert(res.Rsms);
          vm.isSubmitted = false;
        }
      );
    }
  }
})();
