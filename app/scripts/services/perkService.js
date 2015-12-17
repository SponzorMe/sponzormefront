/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function perkRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allPerks: function(){
				return $http.get($rootScope.getConstants().URL + 'perks');

			},
			onePerk: function(perkId){
				return $http.get($rootScope.getConstants().URL + 'perks/' + perkId);

			},
			createPerk: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createPerkToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deletePerk: function(perkId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkPatch: function(perkId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editPerkPut: function(perkId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('perkRequest', perkRequest);
})();
