/**
* @Servicio de Eventos
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventbriteRequest($http, $localStorage, $httpParamSerializerJQLike) {
		var token = $localStorage.token;
		return {
			getEventbriteAuth: function(code){
					return $http.get(apiPath + 'token/eventbrite/' + code);
			},
			getEventbriteEvents: function(token){
					return $http.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token='+token);
			},
			getEventbriteEvent: function(url, token){
					return $http.get(url+'?token='+token);
			}
		};
	}
	angular.module('eventbriteService', ['ngStorage'])
		.factory('eventbriteRequest', eventbriteRequest);
})();
