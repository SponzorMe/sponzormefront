/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function taskSponzorRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allTaskSponzor: function(){
				return $http.get($rootScope.getConstants().URL + 'task_sponzor');

			},
			oneTaskSponzor: function(taskSponzorId){
				return $http.get($rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId);

			},
			tasksBySponzorship: function(sponzorshipId){
				return $http.get($rootScope.getConstants().URL + 'perk_tasks_sponzorship/' + sponzorshipId);
			},
			createTaskSponzor: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createTaskSponzorToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteTaskSponzor: function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editTaskSponzorPatch: function(taskSponzorId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editTaskSponzorPut: function(taskSponzorId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('taskSponzorRequest', taskSponzorRequest);
})();
