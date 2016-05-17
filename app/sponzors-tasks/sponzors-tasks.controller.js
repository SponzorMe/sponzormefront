(function () {
  'use strict';
  function SponzorsTasksController($scope, $localStorage, $rootScope, $routeParams, taskSponzorRequest, dialogRequest, $log) {
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
      vm.changeStatus = function(t) {
        $log.info(t);
        t.loading = true;
        var savedStatus = t.status;
        if (t.status === '1' || t.status === 1) {
          t.status = 0;
        } else {
          t.status = 1;
        }
        var data = {
          status: t.status
        };
        taskSponzorRequest.editTaskSponzorPatch(t.id, data).then(function successCallBack(response) {
          t.loading = false;
          $localStorage.user = JSON.stringify(vm.user);
          vm.regenerateTasks();
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      vm.regenerateTasks();
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme').controller('SponzorsTasksController', SponzorsTasksController);
  SponzorsTasksController.$inject = ['$scope', '$localStorage', '$rootScope', '$routeParams', 'taskSponzorRequest', 'dialogRequest', '$log'];
})();
