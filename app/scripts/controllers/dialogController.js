'use strict';
(function() {
  function DialogController($scope, $translate, ngDialog, $location, $timeout, $localStorage) {
    $scope.close = function(redirect) {
      $location.path(redirect);
      ngDialog.closeAll();
    };
    $scope.closeLoading = function() {
      $location.path('/login');
      ngDialog.closeAll();
    };
    $scope.delayed = false;
    if ($scope.delayed === false) {
      $timeout(function() {
        $scope.delayed = true;
      }, 15000);
    }
  }
  angular.module('sponzorme').controller('DialogController', DialogController);
})();
