'use strict';
(function() {
  angular.module('sponzorme')
    .controller('ActivationController', ActivationController);

  function ActivationController($scope, $routeParams, $translate, $sessionStorage, loginRequest) {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    loginRequest.tryActivation($routeParams.token).success(function(data) {
      if (data.code === 200) {
        $scope.successActivation = true;
      }
    }).error(function(data) {
      $scope.errorActivation = true;
    });
  };
})();
