'use strict';
(function() {
  function OrganizersSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.getTasks = function(s){
        var aux = s.task_sponzor.filter(function(element) {
          if (element.task.type === '0') {
            return element;
          }
        });
        s.task_sponzor = {};
        s.task_sponzor = aux;
        $scope.currentSponzorship = s;
      };
      $scope.user = JSON.parse($localStorage.user);
      if($scope.user.sponzorships_like_organizer){
        $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
      }



      $scope.sendToRating = function(s) {
        sponzorshipRequest.oneSponzorship(s.id).success(function(sData) {
          ratingRequest.ratingBySponzorship(s.id, 0).success(function(s2Data) {
            $scope.loadingForm = false; //Loading
            $rootScope.closeAllDialogs(); //Close Loading
            if (s2Data.data.Rating[0] && s2Data.data.Rating[0].organizer_id === $localStorage.id) {
              $rootScope.showDialog('error', 'ratingAlreadyRated', false);
            } else {
              $location.path('/organizers/rating/' + s.id);
            }
          });
        });
      };
      //This function allows get sponzorship info from organizerId
      $scope.showSponzorInfo = function(sponzorId) {
        $rootScope.showLoading();
        userRequest.oneUser(sponzorId)
          .success(function(sData) {
            $rootScope.closeAllDialogs();
            $scope.user = sData.data;
            ngDialog.open({
              template: 'views/templates/userInfo.html',
              showClose: false,
              scope: $scope
            });
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'canNotGetUserInfo', false);
          });
      };
      $scope.getSponzorshipsByOrganizer = function() {
        $scope.todayDate = new Date().getTime();
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
              var timer = parseInt(parseInt($rootScope.getConstants().EVENTEXPIRATIONDAYS) * 24 * 60 * 60 * 1000);
              var aux = $scope.sponzorships.map(function(s) {
                s.ends = new Date(new Date(s.ends).getTime() + timer);
                return s;
              });
              $scope.sponzorships = aux;
              $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
            } else {
              $scope.noSponzorshipsTaskMessage = true;
            }
            $scope.sponzorships.current = $scope.sponzorships[0].id;
          }
        }).error(function(data) {

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
            lang: $rootScope.currentLanguage()
          };

          var firebaseNotification = {
            to: $scope.sponzorships[i].sponzor_id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + $scope.sponzorships[i].title,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);

          sponzorshipRequest.sendSponzorshipEmail(info).success(function() {});
          $scope.getSponzorshipsByOrganizer();
        }).error(function() {
          $rootScope.showDialog('error', 'problem', false);
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
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId) {
        $rootScope.showLoading();
        sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
          angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
            taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
          });
          setTimeout(function() {
            sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
              $scope.getSponzorshipsByOrganizer();
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('success', 'successDeletingSponzorship', false);
            }).error(function() {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('error', 'errorDeletingSponzorship', false);
            });
          }, 5000);
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

        });
      };
      $scope.deleteTaskSponzor = function(taskSponzorId) {
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
          $scope.getTaskSponzor($scope.sponzorships.current);
        }).error(function(eData) {

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
      $scope.getSponzorshipsByOrganizer();
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();
