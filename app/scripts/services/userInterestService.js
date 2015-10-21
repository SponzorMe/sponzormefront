/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userInterestRequest($http, $sessionStorage) {
		var token = $sessionStorage.token;
		return {
			allUserInterests: function(){
				return $http.get(apiPath + 'user_interests');
			},
			oneUserInterest: function(userInterestId){
				return $http.get(apiPath + 'user_interests/' + userInterestId);
			},
			createUserInterest: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'user_interests',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUserInterest: function(userInterestId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserInterestPatch: function(userInterestId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserInterestPut: function(userInterestId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('userInterestService', ['ngCookies'])
		.factory('userInterestRequest', userInterestRequest);
})();
