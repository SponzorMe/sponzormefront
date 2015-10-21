'use strict';
(function(){

function ResendController($scope, $translate, loginRequest, ngDialog) {
  $scope.error_log = []; //We storage here all translate error during register process
  $scope.resend = function() {
    $scope.loagind = true;
    loginRequest.resendActivation($scope.email).success(function() {
      $scope.loagind = false;
      $scope.error_log[0] = 'ActivationLinkResent';
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
}

angular.module('sponzorme')
.controller('ResendController', ResendController);

})();
