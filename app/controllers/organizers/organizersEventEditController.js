'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, categoryRequest, $rootScope, $routeParams) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Events / Edit',
        title: 'Event Edit'
      };
      $scope.user = JSON.parse($localStorage.user);
      $scope.setEventData();
      $scope.doEditEvent = function(idevent) {
        $rootScope.showLoading();
        $scope.eventData.organizer = $localStorage.id;
        if ($scope.eventData.location !== $scope.locationEvent) {
          $scope.eventData.location = $scope.locationEvent.formatted_address;
          $scope.eventData.location_reference = $scope.locationEvent.place_id;
        }
        $scope.eventData.organizer = $localStorage.id;
        $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD HH:mm:ss');
        eventRequest.editEventPut(idevent, $scope.eventData).then(function successCallback(response) {
          $scope.user.events[$routeParams.id] = response.data.event;
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventEditedSuccesfully', '/organizers/events');
        }, function errorCallback(response) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventNoEdited', false);
        });
      };
      $scope.addPerk = function() {
        $scope.eventData.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      $scope.removePerk = function(index) {
        $scope.eventData.perks.splice(index, 1);
      };
      $scope.eventData = {};
      $scope.eventData = $scope.user.events[$routeParams.id];
      $scope.eventData.starts = new Date($scope.eventData.starts).getTime();
      $scope.eventData.ends = new Date($scope.eventData.ends).getTime();
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();
