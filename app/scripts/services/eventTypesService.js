/**
* @Servicio de event_types
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventTypeService($http, $localStorage, $httpParamSerializerJQLike, URL) {
		var token = $localStorage.token;
		return {
			allEventTypes: function(){
				return $http.get(URL + 'event_types');

			},
			oneEventTypes: function(eventTypeId){
				return $http.get(URL + 'event_types/' + eventTypeId);

			},
			createEventType: function(data){
				return $http({
					method: 'POST',
					url: URL + 'event_types',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteEventType: function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventTypePatch: function(eventTypeId, data){
				return $http({
					method: 'PATCH',
					url: URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editEventTypePut: function(eventTypeId, data){
				return $http({
					method: 'PUT',
					url: URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('eventTypeRequest', eventTypeService);
})();
