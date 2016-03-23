(function() {
  'use strict';
  function SponzorsRatingsController($scope, $localStorage, $rootScope, $log) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user);
      vm.ratings = []; //here is necessary assign the ratings
    }
  }
  angular.module('sponzorme').controller('SponzorsRatingsController', SponzorsRatingsController);
})();
