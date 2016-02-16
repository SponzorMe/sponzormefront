'use strict';
(function() {
  function SponzorsOutstandingController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      /*This function generate the events from the localStorage*/
      vm.restoreEvents = function() {
        vm.events = [];
        if ($localStorage.events) { //If events, Should ever exist events?
          var events = JSON.parse($localStorage.events);
          console.log(events);
          vm.events = events.filter(function(e){
            if(e.outstanding === '1'){
              return e;
            }
          });
        }
      };
      vm.restoreEvents();//Here Starts the callback
    }
  }
  angular.module('sponzorme').controller('SponzorsOutstandingController', SponzorsOutstandingController);
})();
