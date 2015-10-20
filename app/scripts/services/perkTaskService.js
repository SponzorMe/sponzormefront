/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
angular.module('perkTaskService', ['ngStorage'])
	.factory('perkTaskRequest', function($http,$sessionStorage) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $sessionStorage.token;
		return {
			allPerkTasks : function(){
				return $http.get(path + 'perk_tasks');

			},
			onePerkTask : function(perkTaskId){
				return $http.get(path + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask : function(data){
				return $http({
					method: 'POST',
					url: path + 'perk_tasks',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deletePerkTask : function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editPerkTaskPatch : function(perkTaskId,data){
				return $http({
					method: 'PATCH',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editPerkTaskPut : function(perkTaskId,data){
				return $http({
					method: 'PUT',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
