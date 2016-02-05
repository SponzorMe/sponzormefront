'use strict';
(function() {
  function SponzorsEventPageController($scope, $mdSidenav, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, $rootScope) {
    //mock starts

    $scope.openSidenavLeft = function() {
      $mdSidenav('left').toggle();
    };

    $scope.isOpenLeft = function() {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

    $scope.openMenu = function($mdOpenMenu, $event) {
      $scope.originatorEv = $event;
      $mdOpenMenu($event);
    };

    $scope.hideValue = false;

    $scope.toggle = function() {
      if ($scope.hideValue) {
        $scope.hideValue = false;
      } else {
        $scope.hideValue = true;
      }
    };
    //mock ends
    $scope.events = JSON.parse($localStorage.events);
    $scope.currentEvent = $scope.events[$routeParams.eventId];
    $scope.currentEvent.starts = new Date($scope.currentEvent.starts).getTime();
    $scope.currentEvent.ends = new Date($scope.currentEvent.ends).getTime();
    console.log($scope.currentEvent);

    //We display the form to get the sponzorship cause
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
      ngDialog.open({
        template: 'views/templates/formCreateSponzorship.html',
        scope: $scope
      });
    };
    $scope.createSponzorship = function() {
      $rootScope.closeAllDialogs();
      $rootScope.showLoading();
      $scope.user = JSON.parse($localStorage.user);
      $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status === '0') {
          return e;
        }
      });
      sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
        $scope.user.sponzorships.push(response.data.Sponzorship);
        $scope.user.pendingSponzorships.push(response.data.Sponzorship);
        $localStorage.user = JSON.stringify($scope.user);
        firebaseNotification = {
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
  angular.module('sponzorme').controller('SponzorsEventPageController', SponzorsEventPageController);
})();
