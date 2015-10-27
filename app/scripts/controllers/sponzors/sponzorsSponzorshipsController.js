'use strict';
(function(){

function SponzorsSponzorshipsController($scope, $translate, $sessionStorage, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope) {
  $rootScope.userValidation('1');
  $scope.noSponzorshipsMessage = false;
  $scope.noSponzorshipsTaskMessage = false;
  $scope.sponzorshipsLoading = true;
  $scope.loadingTasks = true;
  $scope.emailuser = $sessionStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsBySponzor = function() {
    sponzorshipRequest.oneSponzorshipBySponzor($sessionStorage.id).success(function(data) {
      $scope.sponzorshipsLoading = false;
      $scope.noSponzorshipsMessage = false;
      if (!data.SponzorsEvents[0]) {
        $scope.loadingTasks = false;
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = [];
        var flag = false;//used to verify if there is tasks
        angular.forEach(data.SponzorsEvents, function(value) {
          if (value.status === '1') {
            $scope.sponzorships.push(value);
            flag = true;
          }
        });
        if (flag) {
          $scope.sponzorships.current = $scope.sponzorships[0].id;
          $scope.getTaskSponzor($scope.sponzorships[0]); //Fit the tasks with the first sponzorships
        } else {
          $scope.loadingTasks = false;
          $scope.noSponzorshipsTaskMessage = true;
        }
      }
    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsMessage = true;
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.getSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(data) {
        $scope.currentSponzorship = data;
      });
    };
    //This function changes to 1 the sponzorship status
  $scope.acceptSponzorship = function(sponzoshipId) {
      var data = {
        status: 1
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
      var data = {
        status: 0
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(eData) {
          console.log(eData);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorship) {
      $scope.loadingTasks = true;
      $scope.noSponzorshipsTaskMessage = false;
      $scope.sponzorships.current = sponzorship.id;
      $scope.currentSponzorship = sponzorship;
      taskSponzorRequest.tasksBySponzorship(sponzorship.id).success(function(data) {
        $scope.tasksSponzor = data.tasks;
        $scope.loadingTasks = false;
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
    //This function changes to 1 the sponzor task status
  $scope.completeTask = function(taskSponzorId) {
      var data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
        $scope.getTaskSponzor($scope.currentSponzorship);
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //This function changes to 0 the sponzor task status
  $scope.uncompleteTask = function(taskSponzorId) {
    var data = {
      status: 0
    };
    taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.showTaskForm = function() {
    $scope.todo = {};
    ngDialog.open({
      template: 'formNewTask',
      scope: $scope
    });
  };
  $scope.addTaskSponzor = function() {
    console.log($scope.currentSponzorship);
    $scope.todo.perk_id = $scope.currentSponzorship.perk_id;
    $scope.todo.event_id = $scope.currentSponzorship.event_id;
    $scope.todo.status = 0; //We put the defaul status
    $scope.todo.user_id = $sessionStorage.id; //Get the organizer Id
    $scope.todo.type = 1; //If task is created by sponzor the type is 1
    /** First we crete the perk task, and then we create the task sponzor **/
    perkTaskRequest.createPerkTask($scope.todo).success(function(data) {
      var taskSponzor = {
        status: 0,
        'sponzor_id': $sessionStorage.id,
        'perk_id': $scope.currentSponzorship.perk_id,
        'event_id': $scope.currentSponzorship.event_id,
        'organizer_id': $scope.currentSponzorship.organizer_id,
        'sponzorship_id': $scope.currentSponzorship.id,
        'task_id': data.PerkTask.id
      };
      taskSponzorRequest.createTaskSponzor(taskSponzor).success(function() {
        $scope.getTaskSponzor($scope.currentSponzorship); //Refresh perks data.
      });
      ngDialog.closeAll();
      ngDialog.open({
        template: 'successCreatingTask',
        scope: $scope
      }); //finally we show a dialog telling the status of the things
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.getSponzorshipsBySponzor();
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();
