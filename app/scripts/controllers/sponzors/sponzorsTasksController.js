'use strict';
(function() {
  function SponzorsTasksController($scope, $mdSidenav,  $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray) {
    $scope.user = JSON.parse($localStorage.user);
    console.log($scope.user);
    $scope.tasks = [];
    for(var i = 0; i < $scope.user.sponzorships.length; i++){
      for(var j = 0; j < $scope.user.sponzorships[i].task_sponzor.length; j++){
        var currentTask = $scope.user.sponzorships[i].task_sponzor[j];
        currentTask.event = $scope.user.sponzorships[i].event;
        $scope.tasks.push(currentTask);
      }
    }
    console.log($scope.tasks);
  }
  angular.module('sponzorme')
    .controller('SponzorsTasksController', SponzorsTasksController);

})();
