'use strict';
(function() {

  function EventPageController($scope, $routeParams, $translate, $sessionStorage, eventRequest) {
    $scope.eventLoaded = false;
    $scope.event = {};
    eventRequest.oneEvent($routeParams.eventId).success(function(data) {
      $scope.eventLoaded = true;
      $scope.event = data.data;
    }).error(function() {
      $scope.eventLoaded = true;
    });
  }

  angular.module('sponzorme')
    .controller('EventPageController', EventPageController);

})();
