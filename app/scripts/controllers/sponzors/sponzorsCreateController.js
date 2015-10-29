'use strict';
(function(){

function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, usSpinnerService, $localStorage) {
  $scope.sendfrom = function() {
    $scope.error_log = []; //We storage here all translate error during register process
    if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) { //We verify the passwords not empty.
      if ($scope.passwordone === $scope.passwordtwo) { //We verify the passwords match atleast.
        $scope.objuser = {};
        $scope.objuser.email = $scope.email; //storage the email
        $scope.objuser.password = $scope.passwordone; //storage the password
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect; //storage the current lang
        $scope.objuser.type = 1; //the only difference beetwen the other method is the type.
        $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
        $scope.loagind = true;
        userRequest.createUser($scope.objuser).success(function(adata) {
          if (adata.message === 'Inserted') {
            var datuser = JSON.stringify(adata.User);
            $localStorage.sponzorme = datuser;
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $sessionStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
            $sessionStorage.token = btoa($scope.email + ':' + $scope.passwordone);
            $scope.loagind = false;
            $sessionStorage.typesponzorme = adata.User.type;
            $sessionStorage.id = adata.User.id;
            $sessionStorage.email = adata.User.email;
            $location.path('/customization');
          }
        }).error(function(data) {
          if (data.message === 'Not inserted') {
            if (data.error.email) {
              $scope.error_log.push('errorRegisterEmail');
            }
            if (data.error.name) {
              $scope.error_log.push('errorRegisterName');
            }
            if (data.error.lastname) {
              $scope.error_log.push('errorRegisterLastname');
            }
            if (data.error.password) {
              $scope.error_log.push('errorRegisterPassword');
            }
          }
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        });
      }
    } else {
      $scope.error_log.push('errorRegisterPassword');
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }
  };
}
angular.module('sponzorme')
.controller('SponzorsCreateController', SponzorsCreateController);
})();
