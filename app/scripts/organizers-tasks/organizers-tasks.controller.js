(function() {
  'use strict';
  function OrganizersTasksController($scope, $localStorage, $rootScope, $routeParams) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.regenerateTasks = function () {
        vm.tasks = [];
        for (var i = 0; i < vm.user.sponzorships_like_organizer.length; i++) {
          for (var j = 0; j < vm.user.sponzorships_like_organizer[i].task_sponzor.length; j++) {
            var currentTask = vm.user.sponzorships_like_organizer[i].task_sponzor[j];
            currentTask.event = vm.user.sponzorships_like_organizer[i].event;
            vm.tasks.push(currentTask);
          }
        }
      };
      vm.regenerateTasks();
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersTasksController', OrganizersTasksController);

})();
