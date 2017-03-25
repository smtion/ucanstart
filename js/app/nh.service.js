(function(){
  'use strict';

  angular.module('app')
    .factory('nhApi', nhApi);

  nhApi.$inject = ['$q', '$http', '$rootScope'];
  function nhApi($q, $http, $rootScope) {
    var url = 'http://10.10.3.27:8081/NH-KISA-OTA/ota/process.jsp?p=send&fintechApsno=001';
    var nrOrgCode = '000023';
    var nrAppSn = '001';
    var nhTestAcc = '00602000972';
    var nhRegNo = '170303100052901058';
    var FinAcno = '00820111058421068291058292485';
    var Tlno = '01049775166';
    var BrdtBrno = '19620220';

    var service = {
      get: get,
      status: status,
      balance: balance,
      withdraw: withdraw,
      deposit: deposit,
      history: history
    };

    return service;

    function status() {
      var api = {
        Header: {
          ApiNm: "InquireFinAccountStatus",
          ApiSvcCd: "02M_001_00"
        },
        FinAcno: FinAcno,
        Tlno: Tlno,
        BrdtBrno: BrdtBrno
      };

      return $q(function (resolve, reject) {
        var promise = send(api);
        promise.success(function (res) { resolve(JSON.parse(res)); });
        promise.error(function (res) { reject(false); });
      });
    }

    function history() {
      var api = {
        Header: {
          ApiNm: "InquireTransactionHistory",
          ApiSvcCd: "03Q_005_F0"
        },
        FinAcno: FinAcno,
        Insymd: '20170201',
        Ineymd: '20170325',
        TrnsDsnc: 'A',
        Dmcnt: 10
      };

      return $q(function (resolve, reject) {
        var promise = send(api);
        promise.success(function (res) { resolve(JSON.parse(res)); });
        promise.error(function (res) { reject(false); });
      });
    }

    function balance() {
      var api = {
        Header: {
          ApiNm: "InquireBalance",
          ApiSvcCd: "04Q_003_F0"
        },
        FinAcno: FinAcno
      };

      return $q(function (resolve, reject) {
        var promise = send(api);
        promise.success(function (res) { resolve(JSON.parse(res)); });
        promise.error(function (res) { reject(false); });
      });
    }

    function withdraw(Tram) {
      var api = {
        Header: {
          ApiNm: "DrawingTransfer",
          ApiSvcCd: "01D_001_00"
        },
        FinAcno: FinAcno,
        Tram: Tram,
        DractOtlt: "농작교결제완료"
      };

      return $q(function (resolve, reject) {
        var promise = send(api);
        promise.success(function (res) { resolve(JSON.parse(res)); });
        promise.error(function (res) { reject(false); });
      });
    }

    function deposit(Tram) {
      var api = {
        Header: {
          ApiNm: "ReceivedTransferFinAccount",
          ApiSvcCd: "01M_003_F0"
        },
        FinAcno: FinAcno,
        Tram: Tram,
        MractOtlt: "농작교결제취소"
      };

      return $q(function (resolve, reject) {
        var promise = send(api);
        promise.success(function (res) { resolve(JSON.parse(res)); });
        promise.error(function (res) { reject(false); });
      });
    }

    function get() {
      var api = {
        Header: {
          ApiNm: "RetrieveInstitutionAgreementInformation",
          ApiSvcCd: "02M_001_00"
        }
      };

      // Case 1
      return $q(function (resolve, reject) {
        var promise = send(api);

        promise.success(function (res) {
          resolve(JSON.parse(res));
        });
        promise.error(function (res) {
          reject(false);
        });
      });

      // Case 2
      // var deferred = $q.defer();
      // var promise = send(api);
      // promise.success(function (res) {
      //   console.log('get');
      //   console.log(res);
      //   deferred.resolve(res);
      // });
      // promise.error(function (res) {
      //   console.log('error');
      //   deferred.reject(res);
      // });
      //
      // return deferred.promise;
    }

    function send(api, param) {
      var d = new Date();
      var common = {
        Header: {
          Tsymd: d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2),
          Trtm: ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2),
          Iscd: nrOrgCode,
          FintechApsno: nrAppSn,
          IsTuno: "120" + String(Math.random()).slice(2)
        }
      };
      $.extend(api.Header, common.Header);
      //jsonData = $.extend(jsonData, param);
      // console.log(api);
      var jsonData = api;

      jsonData = JSON.stringify(jsonData);
      jsonData = encodeURIComponent(jsonData).replace(/\"/g,"%22").replace(/\'/g, "%27");

      return $.ajax({
        url: url,
        type: "POST",
        data: "JSONData=" + jsonData,
        cache: false,
      });
    }
  }
})();
