'use strict';
(function(){

function OrganizersCreateController($scope, $translate, userRequest, ngDialog, usSpinnerService, $location, $localStorage) {

  $scope.sendfrom = function() {
    $scope.error_log = [];
    if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
      if ($scope.passwordone === $scope.passwordtwo) {
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.passwordone;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect;
        $scope.objuser.type = 0;
        $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
        $scope.loagind = true;

        userRequest.createUser($scope.objuser).success(function(adata) {

          if (adata.message === 'Inserted') {
            var datuser = JSON.stringify(adata.User);
            $localStorage.sponzorme = datuser;
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
            $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
            $scope.loagind = false;
            $localStorage.typesponzorme = adata.User.type;
            $localStorage.id = adata.User.id;
            $localStorage.email = adata.User.email;
            $localStorage.demo = adata.User.demo;
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
.controller('OrganizersCreateController', OrganizersCreateController);

})();
