(function() {
  'use strict';
  angular.module('sponzorme').factory('categoryRequest', categoryRequest);
  categoryRequest.$inject = ['$http', '$rootScope'];
  function categoryRequest($http, $rootScope) {
    return {
      /**
       * Get all categories
       * @returns promise
       */
      allCategories: function() {
        return $http.get($rootScope.getConstants().URL + 'categories');
      }
    };
  }
})();
