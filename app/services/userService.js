(function() {
  'use strict';
  function userRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    return {
      oneUser: function(userId) {
        var token = $localStorage.token;
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
        return $http.get($rootScope.getConstants().URL + 'users/' + userId);
      },
      home: function(userId) {
        var token = $localStorage.token;
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
        return $http.get($rootScope.getConstants().URL + 'home/' + userId);
      },
      createUser: function(data) {
        var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'users',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      editUserPatch: function(userId, data) {
        console.log('data before send', data);
        var token = $localStorage.token;
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'users/' + userId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      invitedUser: function(data) {
        var token = $localStorage.token;
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'invite_friend/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('userRequest', userRequest);
  userRequest.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', '$rootScope'];
})();
