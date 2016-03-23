(function () {
  'use strict';
  function OrganizersCreateTasksController($scope, $localStorage, $routeParams, taskSponzorRequest, $rootScope, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.addNextTask = function (index) {
        if (vm.sponzorshipsToAdd[index] > -1) {
          var cont = vm.sponzorshipsToAdd[index];
          vm.todo = {
            type: 0, //Because is created by the Organizer
            status: 0, //By default is not complete
            perk_id: vm.user.sponzorships[cont].perk.id,
            event_id: vm.user.sponzorships[cont].event_id,
            sponzorship_id: vm.user.sponzorships[cont].id,
            user_id: $localStorage.id,
            organizer_id: vm.user.sponzorships[cont].organizer.id,
            sponzor_id: $localStorage.id,
            title: vm.task.title,
            description: vm.task.description
          };
          taskSponzorRequest.createTaskSponzor(vm.todo).then(function successCallback(response) {
            vm.user.sponzorships[cont].perk.tasks.push(response.data.PerkTask);
            vm.user.sponzorships[cont].task_sponzor.push(response.data.TaskSponzor);
            vm.addNextTask(index + 1);
          });
        }
        else {
          dialogRequest.closeLoading();
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.showDialog('success', 'dialog.taskAddedSuccessfuly', '/organizers/tasks');
        }
      };
      vm.addNewTask = function () {
        if(vm.task.title && vm.task.description){
          dialogRequest.showLoading();
          vm.addNextTask(0);
        }
        else{
          dialogRequest.showDialog('error', 'dialog.pleaseCompleteAllFields', false);
        }
      };
      vm.changeSponzorship = function (i) {
        if (vm.sponzorshipsToAdd.indexOf(i) > -1) {
          vm.sponzorshipsToAdd.splice(vm.sponzorshipsToAdd.indexOf(i));
        }
        else {
          vm.sponzorshipsToAdd.push(i);
        }
      };
      vm.task = {};
      vm.sponzorshipsToAdd = [];
    }
  }
  angular.module('sponzorme').controller('OrganizersCreateTasksController', OrganizersCreateTasksController);
})();
