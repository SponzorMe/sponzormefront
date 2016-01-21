'use strict';
(function() {
  function SponzorsMasterController($scope, $translate, $localStorage, ngDialog, $location, $rootScope, $sce) {
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    $scope.downloadCalendar = function(sponzorship) {
      $scope.starts = new Date(sponzorship.event.starts).toISOString().replace(':', '').replace('-', '').replace('.', '');
      $scope.ends = new Date(sponzorship.event.ends).toISOString().replace(':', '').replace('-', '').replace('.', '');
      $scope.ends = $scope.ends.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
      $scope.starts = $scope.starts.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
      $scope.currentSponzorship = sponzorship;
      ngDialog.open({
        template: 'views/templates/addToCalendarDialog.html',
        showClose: false,
        scope: $scope
      });
    };
    $scope.openLocation = function(sponzorship) {
      $scope.currentEvent = sponzorship.event;
      $scope.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=" + encodeURIComponent($scope.currentEvent.location);
      ngDialog.open({
        template: 'views/templates/locationDialog.html',
        scope: $scope,
        showClose: true
      });
    };
    $scope.seeCause = function(sponzorship) {
      $scope.cause = sponzorship.cause;
      $scope.status = sponzorship.status;
      ngDialog.open({
        template: 'views/templates/sponzorshipCauseDialog.html',
        showClose: false,
        scope: $scope
      });
    };
    $scope.menuprincipal = 'views/sponzors/menu.html';
  }
  angular.module('sponzorme').controller('SponzorsMasterController', SponzorsMasterController);
})();
