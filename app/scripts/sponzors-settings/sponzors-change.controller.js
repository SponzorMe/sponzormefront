(function() {
  'use strict';
  function SponzorsChangePasswordController($scope, $localStorage, $rootScope, loginRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.resetPassword = function() {
        if (vm.password === vm.passwordConfirmation) {
          dialogRequest.showLoading();
          vm.formData = {
            'email': $localStorage.email,
            'password': vm.password,
            'password_confirmation': vm.passwordConfirmation
          };
          loginRequest.changePassword(vm.formData, $localStorage.token).then(function successCallback(response) {
            dialogRequest.closeLoading();
            $localStorage.token = btoa($localStorage.email + ':' + vm.passwordConfirmation);
            dialogRequest.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            vm.password = '';
            vm.passwordConfirmation = '';
          }, function errorCallback() {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.invalidNewPassword', false);
          });
        } else {
          dialogRequest.showDialog('error', 'dialog.passwordNoMatch', false);
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsChangePasswordController', SponzorsChangePasswordController);
})();
