'use strict';
(function(){
angular.module("sponzorme")
.controller('EventPageController', function($scope, $routeParams, $translate, $sessionStorage, eventRequest) {
  $scope.eventLoaded = false;
  $scope.event = {};
  eventRequest.oneEvent($routeParams.eventId).success(function(data) {
    $scope.eventLoaded = true;
    $scope.event = data.data;
  }).error(function(data) {
    $scope.eventLoaded = true;
  });
});
})();
