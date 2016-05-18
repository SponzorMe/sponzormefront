(function() {
  'use strict';
  function ratingRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      ratingsBySponzor: function(sponzorId) {
        return $http.get($rootScope.getConstants().URL + 'ratings/sponzor/' + sponzorId);
      },
      ratingsByOrganizer: function(organizerId) {
        return $http.get($rootScope.getConstants().URL + 'ratings/organizer/' + organizerId);
      },
      createRating: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'ratings',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('ratingRequest', ratingRequest);
  ratingRequest.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', '$rootScope'];
})();
