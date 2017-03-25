(function(){
  'use strict';

  angular.module('app')
    .controller('orderController', orderController);

  orderController.$inject = ['$scope', 'storage', 'nhApi', '$state', '$stateParams'];
  function orderController($scope, storage, nhApi, $state, $stateParams) {
    var vm = this;
    vm.amount = $stateParams.a;
    vm.balance = 0;
    vm.status = {};
    vm.regDate = '';
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
      vm.product = storage.get('product');
      getStatus();
    }

    function getStatus() {
      nhApi.status().then(
        function (res) {
          vm.status = res;
          vm.regDate = res.RgsnYmd.substr(0, 4) + "-" + res.RgsnYmd.substr(4, 2) + "-" + res.RgsnYmd.substr(6, 2);
        },
        function (error) {
          console.log('error');
        }
      );
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
          if (res.Header.Rpcd == '00000') {
            vm.product.current = parseInt(vm.product.current) + parseInt(vm.amount);
            storage.set('product', vm.product);;
            alert("결제가 완료되었습니다.");
            $state.go('order_done', $stateParams);
          }
          else {
            alert('[API 호출 오류] ' + res.Header.Rsms);
          }
          vm.isSubmitted = false;
        },
        function (res) {
          console.log('Error');
          vm.isSubmitted = false;
        }
      );
    }
  }
})();
