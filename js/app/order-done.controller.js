(function(){
  'use strict';

  angular.module('app')
    .controller('orderDoneController', orderDoneController);

  orderDoneController.$inject = ['$scope', 'storage', 'nhApi', '$state', '$stateParams'];
  function orderDoneController($scope, storage, nhApi, $state, $stateParams) {
    var vm = this;
    vm.amount = $stateParams.a;
    vm.balance = 0;
    vm.product = {};
    vm.paymentMethod = null;
    vm.isLoading = false;
    vm.isSubmitted = false;
    vm.isCanceled = false;
    vm.goHome = goHome;
    vm.getBalance = getBalance;
    vm.cancel = cancel;

    activate();

    // ----------

    function activate() {
      init();
    }

    function init() {
      if (vm.amount <= 0) {
        console.log('Error');
      }
      vm.product = storage.get('product');
    }

    function goHome() {
      $state.go('main');
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

    function cancel() {
      if (!confirm("결제 취소하시겠습니까?")) {
        return;
      }

      vm.isSubmitted = true;

      nhApi.deposit(vm.amount).then(
        function (res) {
          if (res.Header.Rpcd == '00000') {
            vm.isCanceled = true;
            alert("결제취소가 완료되었습니다.\n메인화면으로 이동합니다.");
            $state('main');
          }
          vm.isSubmitted = false;
        },
        function (res) {
          alert(res.Header.Rsms);
          vm.isSubmitted = false;
        }
      );
    }
  }
})();
