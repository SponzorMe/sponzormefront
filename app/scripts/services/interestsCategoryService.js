/**
 * @Servicio de interests_category
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function allInterestsServiceRequest($http, $rootScope) {
    return {
      allInterestsCategoriesId: function() {
        return $http.get($rootScope.getConstants().URL + 'interests_category');

      }
    };
  }
  angular.module('sponzorme').factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();
