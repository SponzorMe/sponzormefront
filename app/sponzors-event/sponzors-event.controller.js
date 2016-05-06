(function () {
  'use strict';
  function SponzorsEventController($scope, $mdDialog, $routeParams, $translate, $localStorage, sponzorshipRequest, $rootScope, dialogRequest, $sce) {
    var vm = this;
    vm.events = JSON.parse($localStorage.events);
    vm.events.filter(function (e) {
      if (e.id === $routeParams.eventId) {
        vm.currentEvent = e;
        vm.currentEvent.perks = vm.currentEvent.perks.filter(function(a){
            a.show = true;
            return a;
          });
      }
    });
    vm.currentEvent.description = $sce.trustAsHtml(vm.currentEvent.description);
    vm.formCreateSponzorship = function (perk) {
      $scope.newSponzorship = { // Review why is not possible with vm instead of $scope
        'organizer_id': vm.currentEvent.user_organizer.id,
        'sponzor_id': $localStorage.id,
        'event_id': vm.currentEvent.id,
        'perk_id': perk.id,
        'cause': '',
        'status': 0
      };
      $mdDialog.show({
        templateUrl: 'sponzors-event/create-sponzorship.html',
        controller: 'SponzorsEventController',
        controllerAs: 'sec',
        scope: $scope,
        clickOutsideToClose: true
      });
    };
    vm.createSponzorship = function () {
      dialogRequest.closeLoading();
      dialogRequest.showLoading();
      vm.user = JSON.parse($localStorage.user);
      vm.user.sponzorships = vm.user.sponzorships.filter(function (e) {
        if (e.status === '0') {
          return e;
        }
      });
      sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
        console.log('ok', response);
        vm.user.sponzorships.push(response.data.Sponzorship);
        $localStorage.user = JSON.stringify(vm.user);
        vm.firebaseNotification = {
          to: vm.currentEvent.user_organizer.id,
          text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + vm.currentEvent.title,
          link: '#/organizers/sponzors'
        };
        $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentEvent.user_organizer.id);
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
      }, function errorCallback(err) {
        console.log('err', err);
        dialogRequest.closeLoading();
        if (err.status === 409) {
          dialogRequest.showDialog('error', 'alreadySponzoring', false);
        } else {
          dialogRequest.showDialog('error', 'youCanNotSponzorThisEvent', false);
        }
      });
    };
  }
  angular.module('sponzorme').controller('SponzorsEventController', SponzorsEventController);
  SponzorsEventController.$inject = ['$scope', '$mdDialog', '$routeParams', '$translate', '$localStorage', 'sponzorshipRequest', '$rootScope', 'dialogRequest', '$sce'];
})();
