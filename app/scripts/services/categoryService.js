/**
 * @Servicio de Categories
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
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
  angular.module('sponzorme').factory('categoryRequest', categoryRequest);
})();
