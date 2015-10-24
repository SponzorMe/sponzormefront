/**
* @Servicio de Usuarios
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userRequest($http, $sessionStorage) {

		return {
			allUsers: function(){
				return $http.get(apiPath + 'users');
			},
			oneUser: function(userId){
				var token = $sessionStorage.token;
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(apiPath + 'users/' + userId);

			},
			createUser: function(data){
				var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
				return $http({
					method: 'POST',
					url: apiPath + 'users',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUser: function(userId){
				var token = $sessionStorage.token;
				return $http({
					method: 'DELETE',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserPatch: function(userId, data){
				var token = $sessionStorage.token;
				return $http({
					method: 'PATCH',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserPut: function(userId, data){
				var token = $sessionStorage.token;
				return $http({
					method: 'PUT',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			invitedUser: function(data){
				var token = $sessionStorage.token;
				return $http({
					method: 'POST',
					url: apiPath + 'invite_friend/',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}

	angular.module('userService', ['ngStorage'])
		.factory('userRequest', userRequest);

})();
