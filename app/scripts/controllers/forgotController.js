'use strict';
(function() {
  function ForgotController($scope, $rootScope, $translate, $routeParams, loginRequest) {
    $scope.forgotPassword = function() {
      $rootScope.showLoading();
      loginRequest.resetPassword($scope.email).then(function successCallback1() {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('success','PasswordResetLinkSent', false);
      }, function errorCallback1() {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error','InvalidEmail', false);
      });
    };
    $scope.resetPassword = function() {
      $rootScope.showLoading();
      if ($scope.password === $scope.passwordConfirmation) {
        var formData = {
          'email': $scope.email,
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };
        loginRequest.updatePassword($routeParams.tokenReset, formData).then(function successCallback2(response) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success','PasswordChangedSuccesfully', '/login');
        }, function errorCallback2(err) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'InvalidData' , false);
        });
      } else {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error', 'PasswordNoMatch' , false);
      }
    };
  }
  angular.module('sponzorme').controller('ForgotController', ForgotController);
})();
