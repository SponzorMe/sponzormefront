(function () {
  'use strict';
  
  angular.module('sponzorme').factory('loginRequest', loginRequest);
  loginRequest.$inject = ['$http', '$httpParamSerializerJQLike', '$rootScope', '$q', '$log'];
  function loginRequest($http, $httpParamSerializerJQLike, $rootScope, $q, $log) {
    return {
      authentication: authentication,
      /**
       * Login function return the user info if the credentials match
       * @param {JSON} credentials.email
       * @param {JSON} credentials.password
       * @returns promise
       */
      login: function (credentials) {
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
      },
      resetPassword: function (email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'send_reset_password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      tryActivation: function (token) {
        return $http.get($rootScope.getConstants().URL + 'verify_activation/' + token);
      },
      resendActivation: function (email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'send_activation',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      updatePassword: function (token, data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'update_password/' + token,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      changePassword: function (data, token) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'change_password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
    function authentication(credentials) {
      return $http({
        method: 'POST',
        url: $rootScope.getConstants().URL + 'auth',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $httpParamSerializerJQLike(credentials)
      }).then(authenticationComplete)
        .catch(authenticationFailed);

      function authenticationComplete(response) {
        $log.info('Authentication Complete');
        return response.data;
      }

      function authenticationFailed(error) {
        $log.error('Authentication Failed');
        $log.error(error.data);
        return $q.reject(error.data);
      }
    }
  }
  
})();
