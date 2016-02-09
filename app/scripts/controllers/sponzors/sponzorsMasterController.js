'use strict';
(function() {
  function SponzorsMasterController($scope, $mdSidenav, $translate, $rootScope) {
    $scope.openMenu = function($mdOpenMenu, $event) {
      $scope.originatorEv = $event;
      $mdOpenMenu($event);
    };
  }
  angular.module('sponzorme').controller('SponzorsMasterController', SponzorsMasterController);
})();
