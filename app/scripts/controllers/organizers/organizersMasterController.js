'use strict';
(function() {
  function OrganizersMasterController($scope, eventTypeRequest, MAXPERKLIMIT, $rootScope, $localStorage, categoryRequest) {
    $scope.setEventData = function(){
      if(!$localStorage.eventTypes){
        eventTypeRequest.allEventTypes().then(function successCallback1(response) {
          $localStorage.eventTypes = JSON.stringify(response.data.eventTypes);
          $scope.eventTypes = response.data.eventTypes;
        });
      }
      else{
        $scope.eventTypes = JSON.parse($localStorage.eventTypes);
      }
      if(!$localStorage.categories){
        categoryRequest.allCategories().then(function successCallback2(response) {
          $localStorage.categories = JSON.stringify(response.data.categories);
          $scope.categories = response.data.categories;
        });
      }
      else{
        $scope.categories = JSON.parse($localStorage.categories);
      }
    }
    $scope.verifyPerkLimit = function(s) {
      if (s.usd > MAXPERKLIMIT || typeof s.usd === 'undefined') {
        s.usd = MAXPERKLIMIT;
        $rootScope.showDialog('error', 'maxLimitPerk', false);
      }
    };
    $scope.menuprincipal = 'views/organizers/menu.html';
  }
  angular.module('sponzorme').controller('OrganizersMasterController', OrganizersMasterController);
})();
