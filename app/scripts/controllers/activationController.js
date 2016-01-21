'use strict';
(function() {
  function ActivationController($scope, $routeParams, $translate, loginRequest) {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    loginRequest.tryActivation($routeParams.token).success(function(data) {
      if (data.code === '200') {
        $scope.successActivation = true;
      }
    }).error(function() {
      $scope.errorActivation = true;
    });
  }
  angular.module('sponzorme').controller('ActivationController', ActivationController);

})();
