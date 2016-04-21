(function() {
  'use strict';
  function ForgotController($scope, $rootScope, $routeParams, loginRequest, dialogRequest) {
    var vm = this;
    vm.forgotPassword = function() {
      dialogRequest.showLoading();
      loginRequest.resetPassword(vm.email).then(function successCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success','PasswordResetLinkSent', false);
      }, function errorCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error','InvalidEmail', false);
      });
    };
    vm.resetPassword = function() {
      dialogRequest.showLoading();
      if (vm.password === vm.passwordConfirmation) {
        var formData = {
          'email': vm.email,
          'password': vm.password,
          'password_confirmation': vm.passwordConfirmation
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
        dialogRequest.showDialog('error', 'errorRegisterPasswordNoMatch' , false);
      }
    };
  }
  angular.module('sponzorme').controller('ForgotController', ForgotController);
})();
