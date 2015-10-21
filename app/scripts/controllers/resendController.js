'use strict';
(function(){
angular.module('sponzorme')
.controller('ResendController', ResendController);

function ResendController($scope, $translate, loginRequest, ngDialog) {
  $scope.error_log = []; //We storage here all translate error during register process
  $scope.resend = function() {
    $scope.loagind = true;
    loginRequest.resendActivation($scope.email).success(function(adata) {

      $scope.loagind = false;
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.ActivationLinkResent');
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }).error(function(edata) {
      $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.InvalidEmail');
      $scope.loagind = false;
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    });
  };

}
})();
