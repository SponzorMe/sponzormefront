/**
* @Servicio de Usuarios 
*
* @author Sebastian
* @version 0.1
*/
'use strict';
angular.module('userService', ['ngStorage'])
	.factory('userRequest', function($http,$sessionStorage) {
		var path = "http://api.sponzor.me/"; //API path

		var token = $sessionStorage.token;

		return {
			allUsers : function(){
				return $http.get(path + 'users');
			},
			oneUser : function(userId){
				var token = $sessionStorage.token;
				$http.defaults.headers.common['Authorization'] = 'Basic ' + token;
				return $http.get(path + 'users/' + userId);

			},
			createUser : function(data){
				var token = $sessionStorage.token;
				return $http({
					method: 'POST',
					url: path + 'users',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUser : function(userId){
				var token = $sessionStorage.token;
				return $http({
					method: 'DELETE',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserPatch : function(userId,data){
				var token = $sessionStorage.token;
				return $http({
					method: 'PATCH',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserPut : function(userId,data){
				var token = $sessionStorage.token;
				return $http({
					method: 'PUT',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			invitedUser : function(data){
				var token = $sessionStorage.token;
				return $http({
					method: 'POST',
					url: path + 'invite_friend/',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}

		}
	});