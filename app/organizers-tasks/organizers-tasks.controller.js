(function() {
  'use strict';

  function OrganizersTasksController($scope, $localStorage, $rootScope, taskSponzorRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.activePerk = function(p, e) {
        for (var i = 0; i < e.perks.length; i++) {
          e.perks[i].active = false;
        }
        p.active = true;
        vm.showHeader = true;
      };
      if(vm.user.eventTasks.length){
        vm.user.eventTasks[0].show = true;
      }
      
      if(vm.user.eventTasks.length && vm.user.eventTasks[0].perks.length && vm.user.eventTasks[0].perks[0].sponzor_tasks.length)
        vm.activePerk(vm.user.eventTasks[0].perks[0],vm.user.eventTasks[0]);
      else if(vm.user.eventTasks.length && vm.user.eventTasks[0].perks.length && vm.user.eventTasks[0].perks[1].sponzor_tasks.length)
        vm.activePerk(vm.user.eventTasks[0].perks[1],vm.user.eventTasks[0]);
      else if(vm.user.eventTasks.length && vm.user.eventTasks[0].perks.length && vm.user.eventTasks[0].perks[2].sponzor_tasks.length)
        vm.activePerk(vm.user.eventTasks[0].perks[2],vm.user.eventTasks[0]);
      else
        vm.noTasks = true;
      vm.changeStatus = function(t) {
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
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersTasksController', OrganizersTasksController);
  OrganizersTasksController.$inject = ['$scope', '$localStorage', '$rootScope', 'taskSponzorRequest'];
})();
