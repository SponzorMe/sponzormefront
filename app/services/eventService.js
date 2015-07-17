/**
* @Servicio de Eventos 
*
* @author Sebastian
* @version 0.1
*/
angular.module('eventService', ['ngStorage'])
	.factory('eventRequest', function($http,$sessionStorage) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $sessionStorage.token;
		return {
			allEvents : function(){
				return $http.get(path + 'events');
					
			},
			oneEvent : function(EventId){
				return $http.get(path + 'events/' + EventId);
				
			},
			createEvent : function(data){
				return $http({
					method: 'POST',
					url: path + 'events',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteEvent : function(EventId){
				return $http({
					method: 'DELETE',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editEventPatch : function(EventId,data){
				return $http({
					method: 'PATCH',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editEventPut : function(EventId,data){
				return $http({
					method: 'PUT',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});