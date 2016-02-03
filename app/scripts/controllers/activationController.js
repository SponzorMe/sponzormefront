'use strict';
(function() {
  function ActivationController($scope, $routeParams, $translate, loginRequest) {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    
  }
  angular.module('sponzorme').controller('ActivationController', ActivationController);

})();
