'use strict';
(function() {
  function SponzorsOutstandingController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      /*This function generate the events from the localStorage*/
      $scope.restoreEvents = function() {
        $scope.events = [];
        if ($localStorage.events) { //If events, Should ever exist events?
          var events = JSON.parse($localStorage.events);
          console.log(events);
          $scope.events = events.filter(function(e){
            if(e.outstanding === '1'){
              return e;
            }
          });
        }
      };
      $scope.restoreEvents();//Here Starts the callback
    }
  }
  angular.module('sponzorme').controller('SponzorsOutstandingController', SponzorsOutstandingController);
})();
