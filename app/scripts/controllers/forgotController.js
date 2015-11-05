'use strict';
(function() {

  function ForgotController($scope, $translate, $routeParams, $sessionStorage, $localStorage, ngDialog, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, loginRequest) {

    $scope.error_log = []; //We storage here all translate error during register process
    $scope.forgotPassword = function() {
      $scope.loagind = true;
      loginRequest.resetPassword($scope.email).success(function(adata) {
        console.log(adata);
        $scope.loagind = false;
        $scope.error_log[0] = 'PasswordResetLinkSent';
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }).error(function() {
        $scope.error_log[0] = 'InvalidEmail';
        $scope.loagind = false;
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      });
    };
    $scope.resetPassword = function() {
      $scope.errorActivation = false;
      $scope.successActivation = false;
      if ($scope.password === $scope.passwordConfirmation) {
        var formData = {
          'email': $scope.email,
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };
        console.log($routeParams.tokenReset);
        loginRequest.updatePassword($routeParams.tokenReset, formData).success(function(data) {
          if (data.code === 200) {
            $scope.successActivation = true;
          }
          $scope.error_log[0] = 'PasswordChangedSuccesfully';
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }).error(function() {
          $scope.error_log[0] = 'InvalidData';
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        });
      } else {
        $scope.error_log[0] = 'PasswordNoMatch';
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('ForgotController', ForgotController);

})();