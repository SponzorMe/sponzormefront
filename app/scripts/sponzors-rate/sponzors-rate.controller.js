(function() {
  'use strict';
  function SponzorsRateController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, ngDialog, $mdDialog) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      if($routeParams.sponzorshipId){
        vm.currentSponzorship = vm.user.sponzorships[$routeParams.sponzorshipId];
        console.log(vm.currentSponzorship);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsRateController', SponzorsRateController);
})();
