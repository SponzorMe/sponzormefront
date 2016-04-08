(function () {
  'use strict';
  function SponzorsTasksController($scope, $localStorage, $rootScope, $routeParams) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.regenerateTasks = function () {
        vm.tasks = [];
        for (var i = 0; i < vm.user.sponzorships.length; i++) {
          for (var j = 0; j < vm.user.sponzorships[i].task_sponzor.length; j++) {
            var currentTask = vm.user.sponzorships[i].task_sponzor[j];
            currentTask.event = vm.user.sponzorships[i].event;
            vm.tasks.push(currentTask);
          }
        }
      };
      vm.regenerateTasks();
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme').controller('SponzorsTasksController', SponzorsTasksController);
})();
