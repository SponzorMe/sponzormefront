(function() {
  'use strict';
  function perkTaskRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createPerkTask: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'perk_tasks',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deletePerkTask: function(perkTaskId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      }
    };
  }
  angular.module('sponzorme').factory('perkTaskRequest', perkTaskRequest);
  perkTaskRequest.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', '$rootScope'];
})();
