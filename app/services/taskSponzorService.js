/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
angular.module('taskSponzorService', ['ngStorage'])
	.factory('taskSponzorRequest', function($http,$sessionStorage) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $sessionStorage.token;
		return {
			allTaskSponzor : function(){
				return $http.get(path + 'task_sponzor');

			},
			oneTaskSponzor : function(taskSponzorId){
				return $http.get(path + 'task_sponzor/' + taskSponzorId);

			},
			tasksBySponzorship : function(sponzorshipId){
				return $http.get(path + 'perk_tasks_sponzorship/' + sponzorshipId);
			},
			createTaskSponzor : function(data){
				return $http({
					method: 'POST',
					url: path + 'task_sponzor',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteTaskSponzor : function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editTaskSponzorPatch : function(taskSponzorId,data){
				return $http({
					method: 'PATCH',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editTaskSponzorPut : function(taskSponzorId,data){
				return $http({
					method: 'PUT',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
