/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function perkTaskRequest($http, $localStorage, $httpParamSerializerJQLike, URL) {
		var token = $localStorage.token;
		return {
			allPerkTasks: function(){
				return $http.get(URL + 'perk_tasks');

			},
			onePerkTask: function(perkTaskId){
				return $http.get(URL + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask: function(data){
				return $http({
					method: 'POST',
					url: URL + 'perk_tasks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deletePerkTask: function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkTaskPatch: function(perkTaskId, data){
				return $http({
					method: 'PATCH',
					url: URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editPerkTaskPut: function(perkTaskId, data){
				return $http({
					method: 'PUT',
					url: URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('perkTaskRequest', perkTaskRequest);
})();
