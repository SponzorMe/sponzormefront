'use strict';
(function () {
  function SponzorsEventController($scope, $mdSidenav, $mdDialog, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, $rootScope) {
    var vm = this;
    vm.events = JSON.parse($localStorage.events);
    vm.currentEvent = vm.events[$routeParams.eventId];
    console.log(vm.currentEvent);
    vm.formCreateSponzorship = function (perk) {
      vm.newSponzorship = {
        'organizer_id': vm.currentEvent.user_organizer.id,
        'sponzor_id': $localStorage.id,
        'event_id': vm.currentEvent.id,
        'perk_id': perk.id,
        'cause': '',
        'status': 0
      };
      $mdDialog.show({
        templateUrl: 'views/templates/formCreateSponzorship.html',
        clickOutsideToClose: true
      });
    };
    vm.createSponzorship = function () {
      $rootScope.closeAllDialogs();
      $rootScope.showLoading();
      vm.user = JSON.parse($localStorage.user);
      vm.user.pendingSponzorships = vm.user.sponzorships.filter(function (e) {
        if (e.status === '0') {
          return e;
        }
      });
      sponzorshipRequest.createSponzorship(vm.newSponzorship).then(function successCallback(response) {
        vm.user.sponzorships.push(response.data.Sponzorship);
        $localStorage.user = JSON.stringify(vm.user);
        vm.firebaseNotification = {
          to: vm.currentEvent.user_organizer.id,
          text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + vm.currentEvent.title,
          link: '#/organizers/sponzors'
        };
        $rootScope.sendFirebaseNotification(firebaseNotification, vm.currentEvent.user_organizer.id);
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
      }, function errorCallback(err) {
        $rootScope.closeAllDialogs();
        if (err.status === 409) {
          $rootScope.showDialog('error', 'alreadySponzoring', false);
        } else {
          $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
        }
      });
    };
  }
  angular.module('sponzorme').controller('SponzorsEventController', SponzorsEventController);
})();
