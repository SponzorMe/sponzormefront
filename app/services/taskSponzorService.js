/**
 * @Servicio de TaskSponzor (Tareas de los patrocinadores)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function taskSponzorRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createTaskSponzor: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'task_sponzor',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteTaskSponzor: function(taskSponzorId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editTaskSponzorPatch: function(taskSponzorId, data) {
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme')
    .factory('taskSponzorRequest', taskSponzorRequest);
})();
