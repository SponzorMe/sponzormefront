'use strict';
(function(){
angular.module("sponzorme")
.controller('UsersSponzorsController', function($scope, $translate, $sessionStorage, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog) {
  $scope.noSponzorshipsMessage = true;
  $scope.loadingsponzorships = true;
  $scope.loadingsponzorshipstasks = true;
  if ($sessionStorage) {
    var cookie = $sessionStorage.cookiesponzorme;
    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }
    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }
    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }
  $scope.emailuser = $sessionStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsByOrganizer = function() {
    sponzorshipRequest.oneSponzorshipByOrganizer($sessionStorage.id).success(function(data) {
      $scope.loadingsponzorships = false;
      $scope.noSponzorshipsMessage = false;
      $scope.loadingsponzorshipstasks = false;
      if (!data.SponzorsEvents[0]) {
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = data.SponzorsEvents;
        if ($scope.sponzorships[0].status != 0) {
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
  $scope.acceptSponzorship = function(sponzoshipId,i) {
      $scope.loadingsponzorships = true;
      $scope.loadingsponzorshipstasks = true;
      var data = {
        status: 1
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        //We make the email Request
        var info = {
          sponzorEmail: $scope.sponzorships[i].email,
          sponzorName: $scope.sponzorships[i].name,
          eventName: $scope.sponzorships[i].title,
          organizerEmail: $sessionStorage.email,
          lang: idiomaselect
        };
        sponzorshipRequest.sendSponzorshipEmail(info).success(function(Sdata){});
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
    $scope.loadingsponzorships = true;
    $scope.loadingsponzorshipstasks = true;
      var data = {
        status: 0
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function(data) {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(data) {
        console.log(data);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value, key) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function(data) {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function(data) {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(data) {
          console.log(data);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.loadingsponzorshipstasks = true;
    $scope.noSponzorshipsTaskMessage = false;

      taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
        $scope.tasksSponzor = [];
        angular.forEach(data.tasks, function(value, key) {
          if (value.type == 0) {
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
      data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
        $scope.getTaskSponzor($scope.sponzorships.current);
      }).error(function(data) {
        console.log(data);
      });
    };
    //This function changes to 0 the sponzor task status
  $scope.uncompleteTask = function(taskSponzorId) {
    data = {
      status: 0
    };
    taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function(data) {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function(data) {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.seeCause = function(sponzorship) {
    console.log("hola");
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
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
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive == true){
           $scope.tolsctive = 'active';
        }
    };
$scope.getSponzorshipsByOrganizer();
  $scope.menuprincipal = 'views/users/menu.html';
});
})();
