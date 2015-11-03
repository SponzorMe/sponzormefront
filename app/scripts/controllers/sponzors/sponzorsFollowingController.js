'use strict';
(function(){

function SponzorsFollowingController($scope, $translate, $localStorage, usSpinnerService, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog, $location, $rootScope) {
  $rootScope.userValidation('1');
  $scope.sponzorshipsLoading = true;
  $scope.noSponzorshipsMessage = false;
  $scope.tasksLoading = true;
  $scope.emailuser = $localStorage.email;
  $scope.loadSponzorships = function() {
      sponzorshipRequest.oneSponzorshipBySponzor($localStorage.id).success(function(data) {
        $scope.sponzorshipsLoading = false;
        if (!data.SponzorsEvents[0]) {
          $scope.tasksLoading = false;
          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.sponzorships = [];
          angular.forEach(data.SponzorsEvents, function(value) {
            if (value.status === '0') {
              $scope.sponzorships.push(value);
            }
          });
          if ($scope.sponzorships[0] && $scope.sponzorships[0].status === '0') {
            $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
            $scope.sponzorships.current = $scope.sponzorships[0].id;
          } else {
            $scope.tasksLoading = false;
            $scope.noSponzorshipsMessage = true;
            $scope.noSponzorshipsTaskMessage = true;
          }

        }
      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
          $scope.loadSponzorships();
        }).error(function(eData) {
          console.log(eData);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.tasksLoading = true;
    $scope.noSponzorshipsTaskMessage = false;
    $scope.sponzorships.current = sponzorshipId;
    taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
      $scope.tasksLoading = false;
      $scope.tasksSponzor = [];
      angular.forEach(data.tasks, function(value) {
        if (value.type === '0') {
          $scope.tasksSponzor.push(value);
        }
      });
      if (!$scope.tasksSponzor[0]) {
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.noSponzorshipsTaskMessage = false;
      }

    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.loadSponzorships();//here starts the callback
  $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsFollowingController', SponzorsFollowingController);

})();
