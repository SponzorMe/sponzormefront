'use strict';
(function() {
  function SponzorsMainController($scope, $mdSidenav, $translate, $localStorage, eventRequest, ngDialog, sponzorshipRequest, $rootScope, $sce, demoRequest, $timeout) {
    if ($rootScope.userValidation('1')) {
      $scope.filter = [];
      $scope.user = JSON.parse($localStorage.user);
      if ($localStorage.events) {
        var events = JSON.parse($localStorage.events);
        $scope.events = events.filter(function(e) {//Remember remove past events and fake events
          e.starts = new Date(e.starts);
          return e;
        });
      }
      $scope.filterClick = function(interest) {
        $scope.filter.push(interest);
      };
      $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };

      $scope.showPerks = function(event) {
        $scope.showForm = false;
        $scope.selectedPerk = false;
        $scope.currentEvent = event;
        ngDialog.open({
          template: 'views/templates/eventPerksDialog.html',
          scope: $scope,
          showClose: true
        });
      };
      $scope.formCreateSponzorship = function(perk) {
        $scope.newSponzorship = {
          'organizer_id': $scope.currentEvent.user_organizer.id,
          'sponzor_id': $localStorage.id,
          'event_id': $scope.currentEvent.id,
          'perk_id': perk.id,
          'cause': '',
          'status': 0
        };
        $scope.selectedPerk = perk;
      };
      $scope.showCauseForm = function() {
        $scope.showForm = true;
      };
      $scope.createSponzorship = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
          $scope.user.sponzorships.push(response.data.Sponzorship);
          $scope.user.pendingSponzorships.push(response.data.Sponzorship);
          $localStorage.user = JSON.stringify($scope.user);
          var firebaseNotification = {
            to: $scope.currentEvent.user_organizer.id,
            text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + $scope.currentEvent.title,
            link: '#/organizers/sponzors'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.currentEvent.user_organizer.id);
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
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();
