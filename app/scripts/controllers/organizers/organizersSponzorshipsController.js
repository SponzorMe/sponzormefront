'use strict';
(function() {
  function OrganizersSponzorshipsController($scope, $translate, taskSponzorRequest, sponzorshipRequest, $localStorage, ngDialog, $rootScope, dialogRequest) {
    //mock starts

    $scope.openSidenavLeft = function(){
      $mdSidenav('left').toggle();
    };

      $scope.sponzorship = [
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        },
        {
          'name': 'mike cunningham',
          'event': 'Este es el nombre del evento, solo 50 caracteres.s',
          'perk': 'comida',
          'status': 'aceptado'
        }
      ]
  $scope.typeOfSponzor = 'gold';

    //mock ends

    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Sponzorships',
        title: 'Sponzorships'
      };
      var firebaseNotification;
      $scope.getTasks = function(s) {
        if (s.task_sponzor.length) {
          var aux1 = s.task_sponzor.filter(function(element) {
            if (element.task.type === '0') {
              return element;
            }
          });
          s.task_sponzor = {};
          s.task_sponzor = aux1;
        }
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
        if ($scope.user.sponzorships_like_organizer.length) {
          $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
        }
      }
      //This function changes to 1 the sponzorship status
      $scope.acceptSponzorship = function(sponzoshipId, i) {
        $scope.user.sponzorships_like_organizer[i].loading = true;
        $scope.currentSponzorshipId = sponzoshipId;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          $scope.user.sponzorships_like_organizer[i].status = 1;
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.currentSponzorship.sponzor.id);
        }, function errorCallback() {
          $scope.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //This function changes to 0 the sponzorship status
      $scope.unacceptSponzorship = function(sponzoshipId, i) {
        $scope.currentSponzorshipId = sponzoshipId;
        $scope.user.sponzorships_like_organizer[i].loading = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[i].status = 0;
          $scope.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipRejected') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.currentSponzorship.sponzor.id);
        }, function errorCallback(response) {
          $scope.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId, i) {
        dialogRequest.showLoading();
        $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback() {
          firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipDeleted') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.currentSponzorship.sponzor.id);
          $scope.user.sponzorships_like_organizer.splice(i, 1);
          $localStorage.user = JSON.stringify($scope.user);
          $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'successDeletingSponzorship', false);
        }, function errorCallback() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorDeletingSponzorship', false);
        });
      };
      $scope.changeStatus = function(index, status) {
        $scope.currentSponzorship.task_sponzor[index].loading = true;
        var taskSponzorId = $scope.currentSponzorship.task_sponzor[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          $scope.currentSponzorship.task_sponzor[index].loading = false;
          $scope.currentSponzorship.task_sponzor[index].status = status;

          firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.TaskChanged1') + $scope.currentSponzorship.task_sponzor[index].task.title + $translate.instant('NOTIFICATIONS.TaskChanged2') + $scope.currentSponzorship.event.title+$translate.instant('NOTIFICATIONS.TaskChanged3'),
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.currentSponzorship.sponzor.id);

          $localStorage.user = JSON.stringify($scope.user);

        }, function errorCallback() {
          $scope.currentSponzorship.task_sponzor[index].loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
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
