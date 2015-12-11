/**
 * @Servicio de Eventos
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function eventbriteRequest($http, $localStorage, $httpParamSerializerJQLike) {
    return {
      getEventbriteAuth: function(code) {
        return $http.get(apiPath + 'token/eventbrite/' + code);
      },
      getEventbriteEvents: function(token) {
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
          }
        };
        return $http.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token, config);
      },
      getEventbriteEvent: function(url, token) {
        var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}
        };
        return $http.get(url + '?token=' + token, config);
      }
    };
  }
  angular.module('eventbriteService', ['ngStorage'])
    .factory('eventbriteRequest', eventbriteRequest);
})();