'use strict';
(function(){

function OrganizersSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope) {
  $rootScope.userValidation('0');
  $scope.noSponzorshipsMessage = false;
  $scope.loadingsponzorships = true;
  $scope.loadingsponzorshipstasks = true;
  $scope.noSponzorshipsTaskMessage = false;
  $scope.emailuser = $localStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsByOrganizer = function() {
    sponzorshipRequest.oneSponzorshipByOrganizer($localStorage.id).success(function(data) {
      $scope.loadingsponzorships = false;
      $scope.noSponzorshipsMessage = false;
      $scope.loadingsponzorshipstasks = false;
      if (!data.SponzorsEvents[0]) {
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = data.SponzorsEvents;
        if ($scope.sponzorships[0].status !== '0') {
          $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
        } else {
          $scope.noSponzorshipsTaskMessage = true;
        }
        $scope.sponzorships.current = $scope.sponzorships[0].id;
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
  $scope.acceptSponzorship = function(sponzoshipId, i) {
      $scope.loadingsponzorships = true;
      $scope.loadingsponzorshipstasks = true;
      var data = {
        status: 1
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
        //We make the email Request
        var info = {
          sponzorEmail: $scope.sponzorships[i].email,
          sponzorName: $scope.sponzorships[i].name,
          eventName: $scope.sponzorships[i].title,
          organizerEmail: $localStorage.email,
          lang: idiomaselect
        };
        sponzorshipRequest.sendSponzorshipEmail(info).success(function(){});
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
    $scope.loadingsponzorships = true;
    $scope.loadingsponzorshipstasks = true;
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
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        setTimeout(function() {
          sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
            $scope.getSponzorshipsByOrganizer();
            ngDialog.closeAll();
            $scope.message = 'successDeletingSponzorship';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });
          }).error(function() {
            ngDialog.closeAll();
            $scope.message = 'errorDeletingSponzorship';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          });}, 5000);
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.loadingsponzorshipstasks = true;
    $scope.noSponzorshipsTaskMessage = false;

      taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
        $scope.tasksSponzor = [];
        angular.forEach(data.tasks, function(value) {
          if (value.type === '0') {
            $scope.tasksSponzor.push(value);
          }
        });
        $scope.loadingsponzorshipstasks = false;

        if (!$scope.tasksSponzor[0]) {
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.noSponzorshipsTaskMessage = false;
        }

      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsTaskMessage = true;
      });
      $scope.sponzorships.current = sponzorshipId;
    };
    //This function changes to 1 the sponzor task status
  $scope.completeTask = function(taskSponzorId) {
      var data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
        $scope.getTaskSponzor($scope.sponzorships.current);
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
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'views/templates/sponzorshipCauseDialog.html',
      showClose: false,
      scope: $scope
    });
  };


  $scope.toggleSidebar = function() {
    console.log($scope.tolsctive);
        $scope.tolsctive = !$scope.tolsctive;
        $scope.$apply();
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

$scope.getSponzorshipsByOrganizer();
  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();
