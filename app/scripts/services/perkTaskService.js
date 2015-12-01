/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function perkTaskRequest($http, $localStorage, $httpParamSerializerJQLike) {
		var token = $localStorage.token;
		return {
			allPerkTasks: function(){
				return $http.get(apiPath + 'perk_tasks');

			},
			onePerkTask: function(perkTaskId){
				return $http.get(apiPath + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'perk_tasks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deletePerkTask: function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkTaskPatch: function(perkTaskId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editPerkTaskPut: function(perkTaskId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('perkTaskService', ['ngStorage'])
		.factory('perkTaskRequest', perkTaskRequest);
})();
