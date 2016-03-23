'use strict';
(function() {
  function ForgotController($scope, $rootScope, $translate, $routeParams, loginRequest, dialogRequest) {
    $scope.forgotPassword = function() {
      dialogRequest.showLoading();
      loginRequest.resetPassword($scope.email).then(function successCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success','PasswordResetLinkSent', false);
      }, function errorCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error','InvalidEmail', false);
      });
    };
    $scope.resetPassword = function() {
      dialogRequest.showLoading();
      if ($scope.password === $scope.passwordConfirmation) {
        var formData = {
          'email': $scope.email,
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };
        loginRequest.updatePassword($routeParams.tokenReset, formData).then(function successCallback2(response) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success','PasswordChangedSuccesfully', '/login');
        }, function errorCallback2(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'InvalidData' , false);
        });
      } else {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error', 'PasswordNoMatch' , false);
      }
    };
  }
  angular.module('sponzorme').controller('ForgotController', ForgotController);
})();
