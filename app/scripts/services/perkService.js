/**
 * @Servicio de Perks (Beneficios)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function perkRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createPerk: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'perks',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deletePerk: function(perkId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'perks/' + perkId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      }
    };
  }
  angular.module('sponzorme').factory('perkRequest', perkRequest);
})();
