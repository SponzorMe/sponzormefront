/**
* @Servicio de event_types
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventTypeService($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allEventTypes: function(){
				return $http.get(apiPath + 'event_types');

			},
			oneEventTypes: function(eventTypeId){
				return $http.get(apiPath + 'event_types/' + eventTypeId);

			},
			createEventType: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'event_types',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteEventType: function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventTypePatch: function(eventTypeId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editEventTypePut: function(eventTypeId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('eventTypeService', ['ngStorage'])
		.factory('eventTypeRequest', eventTypeService);
})();