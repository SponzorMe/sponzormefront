/**
 * @Servicio de Sponzorships (Beneficios)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function sponzorshipRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      oneSponzorship: function(sponzorshipId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId);
      },
      sendSponzorshipEmail: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorship_email',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      sendSponzorshipEmailOrganizer: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorship_email_organizer',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createSponzorship: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorships',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createSponzorshipToken: function(data, userToken) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorships',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + userToken
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteSponzorship: function(sponzorshipId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editSponzorshipPatch: function(sponzorshipId, data) {
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('sponzorshipRequest', sponzorshipRequest);
})();
