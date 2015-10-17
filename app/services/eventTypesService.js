/**
* @Servicio de event_types 
*
* @author Sebastian
* @version 0.1
*/
angular.module('eventTypeService', ['ngStorage'])
	.factory('eventTypeRequest', function($http, $sessionStorage) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $sessionStorage.token;
		return {
			allEventTypes : function(){
				return $http.get(path + 'event_types');
					
			},
			oneEventTypes : function(eventTypeId){
				return $http.get(path + 'event_types/' + categoriesId);
				
			},
			createEventType : function(data){
				return $http({
					method: 'POST',
					url: path + 'event_types',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteEventType : function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: path + 'event_types/' + eventTypeId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editEventTypePatch : function(eventTypeId,data){
				return $http({
					method: 'PATCH',
					url: path + 'event_types/' + eventTypeId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editEventTypePut : function(eventTypeId,data){
				return $http({
					method: 'PUT',
					url: path + 'event_types/' + eventTypeId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});