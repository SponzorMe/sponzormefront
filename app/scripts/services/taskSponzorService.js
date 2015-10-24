/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function taskSponzorRequest($http, $sessionStorage) {
		var token = $sessionStorage.token;
		return {
			allTaskSponzor: function(){
				return $http.get(apiPath + 'task_sponzor');

			},
			oneTaskSponzor: function(taskSponzorId){
				return $http.get(apiPath + 'task_sponzor/' + taskSponzorId);

			},
			tasksBySponzorship: function(sponzorshipId){
				return $http.get(apiPath + 'perk_tasks_sponzorship/' + sponzorshipId);
			},
			createTaskSponzor: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteTaskSponzor: function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editTaskSponzorPatch: function(taskSponzorId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editTaskSponzorPut: function(taskSponzorId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('taskSponzorService', ['ngStorage'])
		.factory('taskSponzorRequest', taskSponzorRequest);
})();
