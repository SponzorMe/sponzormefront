(function() {
  'use strict';
  function SponzorsRatingsController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.ratings = []; //here is necessary assign the ratings
    }
  }
  angular.module('sponzorme').controller('SponzorsRatingsController', SponzorsRatingsController);
  SponzorsRatingsController.$inject = ['$scope', '$localStorage', '$rootScope'];
})();
