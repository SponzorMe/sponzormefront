/**
* @Servicio de Eventos
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allEvents: function(){
				return $http.get($rootScope.getConstants().URL + 'events');

			},
			oneEvent: function(EventId){
				return $http.get($rootScope.getConstants().URL + 'events/' + EventId);

			},
			createEvent: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createEventToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteEvent: function(EventId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventPatch: function(EventId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editEventPut: function(EventId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('eventRequest', eventRequest);
})();
