(function() {
  'use strict';
  function SponzorsChangePasswordController($scope, $localStorage, $rootScope, loginRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.resetPassword = function() {
        if (vm.password === vm.passwordConfirmation) {
          $rootScope.showLoading();
          vm.formData = {
            'email': $localStorage.email,
            'password': vm.password,
            'password_confirmation': vm.passwordConfirmation
          };
          loginRequest.changePassword(vm.formData, $localStorage.token).then(function successCallback(response) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + vm.passwordConfirmation);
            $rootScope.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            vm.password = '';
            vm.passwordConfirmation = '';
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
