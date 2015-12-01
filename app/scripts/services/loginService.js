'use strict';
(function() {
  /**
   * Login Service factory
   * @autor  Sebastian Gomez
   * @email  seagomezar@gmail.com
   * @date   2015-11-16
   */
  function loginRequest($http) {
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
          url: apiPath + 'auth',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(data)
        });
      },
      resetPassword: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: apiPath + 'send_reset_password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(data)
        });
      },
      tryActivation: function(token) {
        return $http.get(apiPath + 'verify_activation/' + token);
      },
      resendActivation: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: apiPath + 'send_activation',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(data)
        });
      },
      updatePassword: function(token, data) {
        return $http({
          method: 'POST',
          url: apiPath + 'update_password/' + token,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(data)
        });
      },
      changePassword: function(data, token) {
        return $http({
          method: 'POST',
          url: apiPath + 'change_password',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
        });
      }
    };
  }
  angular.module('loginService', [])
    .factory('loginRequest', loginRequest);
})();
