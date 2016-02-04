'use strict';
(function() {
  function SponzorsOutstandingController($scope, $mdSidenav, $translate, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
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
      if ($localStorage.events) {
        var events = JSON.parse($localStorage.events);
        $scope.events = events.filter(function(e) {
          //Remember filter here, past events and fake events
          e.starts = new Date(e.starts);
          return e;
        });
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsOutstandingController', SponzorsOutstandingController);
})();
