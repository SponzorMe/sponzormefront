'use strict';
(function() {
  function EventPageController($scope, $mdSidenav,$routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, $rootScope, dialogRequest) {
    //mock starts

   $scope.openSidenavLeft = function(){
        $mdSidenav('left').toggle();
   };

   $scope.isOpenLeft = function () {
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

    $scope.eventLoaded = false;
    var firebaseNotification;
    $scope.todayDate = new Date().getTime();
    eventRequest.oneEvent($routeParams.eventId).then(function successCallback(response) {
      $scope.eventLoaded = true;
      $scope.currentEvent = response.data.event;
      $scope.currentEvent.starts = new Date($scope.currentEvent.starts).getTime();
      $scope.eventURL = $location.absUrl();
    }, function errorCallback() {
      $scope.eventLoaded = true;
    });
    if ($localStorage.typesponzorme === '1' && !$rootScope.isExpiredData()) { //He is an sponzor
      $scope.isSponzor = true;
      $scope.isNoLogged = false;
    } else if ($localStorage.typesponzorme === '0' && !$rootScope.isExpiredData()) { //He is an organizer
      $scope.isSponzor = false;
      $scope.isNoLogged = false;
    } else { //He is a guest
      $scope.isSponzor = false;
      $scope.isNoLogged = true;
    }
    $scope.sendToLogin = function() {
      $localStorage.redirectTo = $scope.eventURL;
      $location.path('/login');
    };
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
      dialogRequest.closeLoading();
      dialogRequest.showLoading();
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
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
      }, function errorCallback(err) {
        dialogRequest.closeLoading();
        if (err.status === 409) {
          dialogRequest.showDialog('error', 'alreadySponzoring', false);
        } else {
          dialogRequest.showDialog('error', 'youCanNotSponzorThisEvent', false);
        }
      });
    };
  }
  angular.module('sponzorme').controller('EventPageController', EventPageController);
})();
