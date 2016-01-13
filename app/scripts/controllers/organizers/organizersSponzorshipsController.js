'use strict';
(function() {
  function OrganizersSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route:'Sponzorships',
        title: 'Sponzorships'
      };
      $scope.getTasks = function(s) {
        var aux = s.task_sponzor.filter(function(element) {
          if (element.task.type === '0') {
            return element;
          }
        });
        s.task_sponzor = {};
        s.task_sponzor = aux;
        $scope.currentSponzorship = s;
      };
      $scope.todayDate = new Date().getTime();
      $scope.user = JSON.parse($localStorage.user);
      if ($scope.user.sponzorships_like_organizer) {
        var aux = $scope.user.sponzorships_like_organizer.filter(function(element) {
          element.event.ends = new Date(element.event.ends).getTime();
            return element;
        });
        $scope.user.sponzorships_like_organizer.filter = aux;
        $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
      }
      //This function changes to 1 the sponzorship status
      $scope.acceptSponzorship = function(sponzoshipId, i) {
        $scope.currentSponzorshipId = sponzoshipId;
        $scope.loadingsponzorships = true;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback() {
          $scope.user.sponzorships_like_organizer[i].status = 1;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          $scope.loadingsponzorships = false;
          var info = {
            sponzorEmail: $scope.currentSponzorship.sponzor.email,
            sponzorName: $scope.currentSponzorship.sponzor.name,
            eventName: $scope.currentSponzorship.event.title,
            organizerEmail: $localStorage.email,
            lang: $rootScope.currentLanguage()
          };
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
          sponzorshipRequest.sendSponzorshipEmail(info).then(function successCallback() {});
        }, function errorCallback(response) {
          $scope.loadingsponzorships = false;
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      //This function changes to 0 the sponzorship status
      $scope.unacceptSponzorship = function(sponzoshipId, i) {
        $scope.currentSponzorshipId = sponzoshipId;
        $scope.loadingsponzorships = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback() {
          $scope.user.sponzorships_like_organizer[i].status = 0;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          $scope.loadingsponzorships = false;
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipRejected') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
        }, function errorCallback(response) {
          $scope.loadingsponzorships = false;
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId, i) {
        $rootScope.showLoading();
        $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback() {
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipDeleted') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
          $scope.user.sponzorships_like_organizer.splice(i, 1);
          $localStorage.user = JSON.stringify($scope.user);

          $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'successDeletingSponzorship', false);
        }, function errorCallback() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingSponzorship', false);
        });
      };
      //This function changes to 1 the sponzor task status
      $scope.completeTask = function(taskSponzorId) {
        var data = {
          status: 1
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {}).error(function(eData) {

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
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();
