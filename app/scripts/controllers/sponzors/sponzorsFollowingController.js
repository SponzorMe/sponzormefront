'use strict';
(function(){
angular.module('sponzorme')
.controller('SponzorsFollowingController', SponzorsFollowingController);

function SponzorsFollowingController($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog) {

  $scope.loadinglistsponzors = true;

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie === undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini !== undefined) {
      if (typeini === '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path('/');
  }

  $scope.emailuser = $sessionStorage.email;

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.sponzors = adata.data.user.events;
      $scope.loadinglistsponzors = false;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.sponzors = sponzormeObj.events;
    $scope.loadinglistsponzors = false;
  }
  $scope.loadSponzorships = function() {
      sponzorshipRequest.oneSponzorshipBySponzor($sessionStorage.id).success(function(data) {
        console.log(data);
        $scope.loadingsponzorships = false;
        $scope.noSponzorshipsMessage = false;
        $scope.loadingsponzorshipstasks = false;
        if (!data.SponzorsEvents[0]) {
          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.sponzorships = [];
          angular.forEach(data.SponzorsEvents, function(value) {
            if (value.status === 0) {
              $scope.sponzorships.push(value);
            }
          });
          if ($scope.sponzorships[0] && $scope.sponzorships[0].status === 0) {
            $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
            $scope.sponzorships.current = $scope.sponzorships[0].id;
          } else {
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
    $scope.sponzorships.current = sponzorshipId;
    taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
      $scope.loadingsponzorshipstasks = false;
      $scope.tasksSponzor = [];
      angular.forEach(data.tasks, function(value) {
        if (value.type === 0) {
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
  $scope.loadSponzorships();
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/sponzors/menu.html';


}
})();
