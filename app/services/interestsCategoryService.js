(function () {
  'use strict';
  function allInterestsServiceRequest($http, $rootScope) {
    return {
      allInterestsCategoriesId: function () {
        return $http.get($rootScope.getConstants().URL + 'interests_category');

      }
    };
  }
  angular.module('sponzorme').factory('allInterestsServiceRequest', allInterestsServiceRequest);
  allInterestsServiceRequest.$inject = ['$http', '$rootScope'];
})();
