'use strict';
(function() {
  function SponzorsOutstandingController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      console.log(vm.user);
      /*This function generate the events from the localStorage*/
      vm.restoreEvents = function() {
        vm.events = [];
        if ($localStorage.events) { //If events, Should ever exist events?
          var events = JSON.parse($localStorage.events);
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
