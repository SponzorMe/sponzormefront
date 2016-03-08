'use strict';
(function() {
  function OrganizersSponzorsController($scope, $translate, taskSponzorRequest, sponzorshipRequest, $localStorage, $rootScope, dialogRequest, SPONZORSHIPSTATUSES) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.statuses = SPONZORSHIPSTATUSES;
      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);

      //This function changes to 1 the sponzorship status
      vm.acceptSponzorship = function(sponzoshipId, i) {
        vm.user.sponzorships_like_organizer[i].loading = true;
        vm.currentSponzorshipId = sponzoshipId;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          vm.user.sponzorships_like_organizer[i].status = 1;
          vm.user.sponzorships_like_organizer[i].loading = false;
          vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify(vm.user);
          firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, vm.currentSponzorship.sponzor.id);
        }, function errorCallback() {
          vm.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //This function changes to 0 the sponzorship status
      vm.unacceptSponzorship = function(sponzoshipId, i) {
        vm.currentSponzorshipId = sponzoshipId;
        vm.user.sponzorships_like_organizer[i].loading = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[i].status = 0;
          vm.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          vm.user.sponzorships_like_organizer[i].loading = false;
          vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify(vm.user);
          firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipRejected') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, vm.currentSponzorship.sponzor.id);
        }, function errorCallback(response) {
          vm.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      vm.deleteSponzorship = function(sponzorshipId, i) {
        dialogRequest.showLoading();
        vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback() {
          firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipDeleted') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, vm.currentSponzorship.sponzor.id);
          vm.user.sponzorships_like_organizer.splice(i, 1);
          $localStorage.user = JSON.stringify(vm.user);
          vm.getTasks(vm.user.sponzorships_like_organizer[0]);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'successDeletingSponzorship', false);
        }, function errorCallback() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorDeletingSponzorship', false);
        });
      };
      vm.changeStatus = function(index, status) {
        vm.currentSponzorship.task_sponzor[index].loading = true;
        var taskSponzorId = vm.currentSponzorship.task_sponzor[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          vm.currentSponzorship.task_sponzor[index].loading = false;
          vm.currentSponzorship.task_sponzor[index].status = status;

          firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.TaskChanged1') + vm.currentSponzorship.task_sponzor[index].task.title + $translate.instant('NOTIFICATIONS.TaskChanged2') + vm.currentSponzorship.event.title+$translate.instant('NOTIFICATIONS.TaskChanged3'),
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, vm.currentSponzorship.sponzor.id);

          $localStorage.user = JSON.stringify(vm.user);

        }, function errorCallback() {
          vm.currentSponzorship.task_sponzor[index].loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      vm.seeCause = function(sponzorship) {
        vm.cause = sponzorship.cause;
        ngDialog.open({
          template: 'views/templates/sponzorshipCauseDialog.html',
          showClose: false,
          scope: $scope
        });
      };
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorsController', OrganizersSponzorsController);

})();
