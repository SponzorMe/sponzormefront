'use strict';
(function() {
  /**
   * Login Service factory
   * @autor  Sebastian Gomez
   * @email  seagomezar@gmail.com
   * @date   2015-11-16
   */
  function loginRequest($http, $httpParamSerializerJQLike, $rootScope) {
    return {
      login: function(credentials) {
        var data = {
          'email': credentials.email,
          'password': credentials.password
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'auth',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
  }
  angular.module('sponzorme').factory('loginRequest', loginRequest);
})();
