(function() {
  'use strict';
  function eventRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      allEvents: function() {
        return $http.get($rootScope.getConstants().URL + 'events');

      },
      oneEvent: function(eventId) {
        return $http.get($rootScope.getConstants().URL + 'events/' + eventId);

      },
      saveEvent: function(eventId, userId) {
        return $http.get($rootScope.getConstants().URL + 'events/save/' + eventId + '/' + userId);
      },
      saveRemoveEvent: function(eventId) {
        return $http.get($rootScope.getConstants().URL + 'events/remove_saved/' + eventId);
      },
      createEvent: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'events',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createEventToken: function(data, newUserToken) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'events',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + newUserToken
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteEvent: function(eventId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'events/' + eventId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editEventPut: function(eventId, data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'events/' + eventId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('eventRequest', eventRequest);
  eventRequest.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', '$rootScope'];
})();
