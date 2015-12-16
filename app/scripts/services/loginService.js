'use strict';
(function() {
  /**
   * Login Service factory
   * @autor  Sebastian Gomez
   * @email  seagomezar@gmail.com
   * @date   2015-11-16
   */
  function loginRequest($http, $httpParamSerializerJQLike, URL) {
    return {
      /**
       * Login function return the user info if the credentials match
       * @param {JSON} credentials.email
       * @param {JSON} credentials.password
       * @returns success(function(data, status, headers, config)
       */
      login: function(credentials) {
        var data = {
          'email': credentials.email,
          'password': credentials.password
        };
        return $http({
          method: 'POST',
          url: URL + 'auth',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      resetPassword: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: URL + 'send_reset_password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      tryActivation: function(token) {
        return $http.get(URL + 'verify_activation/' + token);
      },
      resendActivation: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: URL + 'send_activation',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      updatePassword: function(token, data) {
        return $http({
          method: 'POST',
          url: URL + 'update_password/' + token,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      changePassword: function(data, token) {
        return $http({
          method: 'POST',
          url: URL + 'change_password',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme')
    .factory('loginRequest', loginRequest);
})();
