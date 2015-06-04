/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores) 
*
* @author Sebastian
* @version 0.1
*/
angular.module('userInterestService', ['ngCookies'])
	.factory('userInterestRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allUserInterests : function(){
				return $http.get(path + 'user_interests');	
			},
			oneUserInterest : function(userInterestId){
				return $http.get(path + 'user_interests/' + userInterestId);
			},
			createUserInterest : function(data){
				return $http({
					method: 'POST',
					url: path + 'user_interests',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUserInterest : function(userInterestId){
				return $http({
					method: 'DELETE',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserInterestPatch : function(userInterestId,data){
				return $http({
					method: 'PATCH',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserInterestPut : function(userInterestId,data){
				return $http({
					method: 'PUT',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});