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
      var value = window.localStorage.getItem(key);
      try {
        value = JSON.parse(value);
      } catch (e) {
        
      }
      return value;
    }

    function set(key, value) {
      if (typeof value == 'object') value = JSON.stringify(value);
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
