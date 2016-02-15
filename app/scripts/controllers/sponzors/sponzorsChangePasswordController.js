'use strict';
(function() {
  function SponzorsChangePasswordController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.user = JSON.parse($localStorage.user);
      $scope.resetPassword = function() {
        if ($scope.password === $scope.passwordConfirmation) {
          $rootScope.showLoading();
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).then(function successCallback(response) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            $scope.password = '';
            $scope.passwordConfirmation = '';
          }, function errorCallback() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'dialog.invalidNewPassword', false);
          });
        } else {
          $rootScope.showDialog('error', 'dialog.passwordNoMatch', false);
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsChangePasswordController', SponzorsChangePasswordController);
})();
