
(function () {
  'use strict';
  function notificationRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      sendChatMailNotification: function (data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'chat/notification',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('notificationRequest', notificationRequest);
})();
