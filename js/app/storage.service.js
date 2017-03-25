(function() {
  'use strict';

  angular.module('app')
    .factory('storage', storage);

  storage.$inject = [];
  function storage() {
    var service = {
      get: get,
      set: set,
      remove: remove,
      clear: clear
    };

    return service;

    // ----------

    function get(key) {
      return window.localStorage.getItem(key);
    }

    function set(key, value) {
      window.localStorage.setItem(key, value);
    }

    function remove(key) {
      window.localStorage.removeItem(key);
    }

    function clear() {
      window.localStorage.clear();
    }
  }
}());
