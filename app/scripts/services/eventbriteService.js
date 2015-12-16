/**
 * @Servicio de Eventos
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function eventbriteRequest($http, $localStorage, $httpParamSerializerJQLike, URL) {
    return {
      getEventbriteAuth: function(code) {
        return $http.get(URL + 'token/eventbrite/' + code);
      },
      getMeetupAuth: function(code) {
        return $http.get(URL + 'token/meetup/' + code);
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
      getMeetupGroups: function(token) {
        return $http.get(URL + 'events/meetup/' + token);
      },
      getEventbriteEvent: function(url, token) {
        var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}
        };
        return $http.get(url + '?token=' + token, config);
      }
    };
  }
  angular.module('sponzorme')
    .factory('eventbriteRequest', eventbriteRequest);
})();
