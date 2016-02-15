'use strict';
(function () {
  function SponzorsTasksController($scope, $localStorage, $routeParams, $location, ngDialog,  taskSponzorRequest, $rootScope) {
    $scope.user = JSON.parse($localStorage.user);
    $scope.regenerateTasks = function () {
      $scope.tasks = [];
      for (var i = 0; i < $scope.user.sponzorships.length; i++) {
        for (var j = 0; j < $scope.user.sponzorships[i].task_sponzor.length; j++) {
          var currentTask = $scope.user.sponzorships[i].task_sponzor[j];
          currentTask.event = $scope.user.sponzorships[i].event;
          $scope.tasks.push(currentTask);
        }
      }
    };
    $scope.addNextTask = function (index) {
      if ($scope.sponzorshipsToAdd[index] > -1) {
        var cont = $scope.sponzorshipsToAdd[index];
        $scope.todo = {
          type: 1, //Because is created by the Sponzor
          status: 0, //By default is not complete
          perk_id: $scope.user.sponzorships[cont].perk.id,
          event_id: $scope.user.sponzorships[cont].event_id,
          sponzorship_id: $scope.user.sponzorships[cont].id,
          user_id: $localStorage.id,
          organizer_id: $scope.user.sponzorships[cont].organizer.id,
          sponzor_id: $localStorage.id,
          title: $scope.task.title,
          description: $scope.task.description
        };
        taskSponzorRequest.createTaskSponzor($scope.todo).then(function successCallback(response) {
          $scope.user.sponzorships[cont].perk.tasks.push(response.data.PerkTask);
          $scope.user.sponzorships[cont].task_sponzor.push(response.data.TaskSponzor);
          $scope.addNextTask(index + 1);
        });
      }
      else {
        $rootScope.closeAllDialogs();
        $localStorage.user = JSON.stringify($scope.user);
        $rootScope.showDialog('success', 'dialog.taskAddedSuccessfuly', '/sponzors/tasks');
      }
    };
    $scope.addNewTask = function () {
      if($scope.task.title && $scope.task.description){
        $rootScope.showLoading();
        $scope.addNextTask(0);
      }
      else{
        $rootScope.showDialog('error', 'dialog.pleaseCompleteAllFields', false);
      }
    };
    $scope.changeSponzorship = function (i) {
      if ($scope.sponzorshipsToAdd.indexOf(i) > -1) {
        $scope.sponzorshipsToAdd.splice($scope.sponzorshipsToAdd.indexOf(i));
      }
      else {
        $scope.sponzorshipsToAdd.push(i);
      }
    };
    $scope.regenerateTasks();
    $scope.task = {};
    $scope.sponzorshipsToAdd = [];
    $scope.currentTaskIndex = $routeParams.id;

  }
  angular.module('sponzorme')
    .controller('SponzorsTasksController', SponzorsTasksController);

})();
