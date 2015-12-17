/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userInterestRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allUserInterests: function(){
				return $http.get($rootScope.getConstants().URL + 'user_interests');
			},
			oneUserInterest: function(userInterestId){
				return $http.get($rootScope.getConstants().URL + 'user_interests/' + userInterestId);
			},
			createUserInterest: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'user_interests',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUserInterest: function(userInterestId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserInterestPatch: function(userInterestId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserInterestPut: function(userInterestId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('userInterestRequest', userInterestRequest);
})();
