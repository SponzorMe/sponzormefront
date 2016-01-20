'use strict';
(function() {
  function SponzorsMainController($scope, $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $window, $sce) {
    if ($rootScope.userValidation('1')) {
      $scope.user = JSON.parse($localStorage.user);
      $scope.balance = 0;
      $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status === '0') {
          return e;
        }
      });
      $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status > 0) {
          $scope.balance = parseInt(e.perk.usd) + parseInt($scope.balance);
          e.event.ends = new Date(e.event.ends).getTime();
          return e;
        }
      });
      if ($localStorage.events) {
        var events = JSON.parse($localStorage.events);
        $scope.search = events.filter(function(e) {
          if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
            return e;
          }
        });
      }
      $localStorage.user = JSON.stringify($scope.user);
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
      $scope.getAllEvents = function() {
        $scope.searchLoading = true;
        eventRequest.allEvents().then(function successCallback(response) {
          $localStorage.events = JSON.stringify(response.data.data.events);
          $scope.search = [];
          $scope.search = response.data.data.events.filter(function(e) {
            if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
              return e;
            }
          });
          $scope.searchLoading = false;
        }, function errorCallback() {
          $scope.searchLoading = false;
        });
      };
      $scope.openLocation = function(event) {
        $scope.currentEvent = event;
        $scope.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=" + encodeURIComponent($scope.currentEvent.location);
        ngDialog.open({
          template: 'views/templates/locationDialog.html',
          scope: $scope,
          showClose: true
        });
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
      $scope.showCauseForm = function(){
        $scope.showForm = true;
      };
      $scope.createSponzorship = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
          $scope.user.sponzorships.push(response.data.Sponzorship);
          $scope.user.pendingSponzorships.push(response.data.Sponzorship);
          $localStorage.user = JSON.stringify($scope.user);
          var info = {
            organizerId: $scope.currentEvent.user_organizer.id,
            eventName: $scope.currentEvent.title,
            lang: $rootScope.currentLanguage()
          };
          var firebaseNotification = {
            to: $scope.currentEvent.user_organizer.id,
            text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + $scope.currentEvent.title,
            link: '#/organizers/sponzors'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
          sponzorshipRequest.sendSponzorshipEmailOrganizer(info).then(function(){});
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
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();
