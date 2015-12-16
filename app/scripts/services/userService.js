/**
* @Servicio de Usuarios
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userRequest($http, $localStorage, $httpParamSerializerJQLike, URL) {

		return {
			allUsers: function(){
				return $http.get(URL + 'users');
			},
			oneUser: function(userId){
				var token = $localStorage.token;
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(URL + 'users/' + userId);

			},
			createUser: function(data){
				var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
				return $http({
					method: 'POST',
					url: URL + 'users',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUser: function(userId){
				var token = $localStorage.token;
				return $http({
					method: 'DELETE',
					url: URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserPatch: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PATCH',
					url: URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserPut: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PUT',
					url: URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			invitedUser: function(data){
				var token = $localStorage.token;
				return $http({
					method: 'POST',
					url: URL + 'invite_friend/',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}

	angular.module('sponzorme')
		.factory('userRequest', userRequest);

})();
