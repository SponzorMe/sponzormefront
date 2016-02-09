'use strict';
(function() {
  function SponzorsSavedController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      $scope.user = JSON.parse($localStorage.user);
      console.log($scope.user);
    }
  }
  angular.module('sponzorme').controller('SponzorsSavedController', SponzorsSavedController);
})();
