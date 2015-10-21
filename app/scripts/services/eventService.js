/**
* @Servicio de Eventos
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventRequest($http, $sessionStorage) {
		var token = $sessionStorage.token;
		return {
			allEvents: function(){
				return $http.get(apiPath + 'events');

			},
			oneEvent: function(EventId){
				return $http.get(apiPath + 'events/' + EventId);

			},
			createEvent: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteEvent: function(EventId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventPatch: function(EventId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editEventPut: function(EventId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('eventService', ['ngStorage'])
		.factory('eventRequest', eventRequest);
})();
