'use strict';
(function(){

function LoginController($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog) {

  $localStorage.$reset();

  $scope.sendfrom = function() {

    if ($scope.email !== undefined || $scope.password !== undefined) {
      $scope.objuser = {};
      $scope.objuser.email = $scope.email;
      $scope.objuser.password = $scope.password;
      $scope.objuser.password_confirmation = $scope.passwordtwo;
      $scope.objuser.lang = idiomaselect;
      $scope.loagind = true;
      $scope.error_log = [];
      loginRequest.login($scope.objuser).success(function(adata) {
        if (adata.user.activated) {
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
          $localStorage.typesponzorme = adata.user.type;
          $localStorage.token = btoa($scope.email + ':' + $scope.password);
          $localStorage.id = adata.user.id;
          $localStorage.email = adata.user.email;
          $localStorage.demo = adata.user.demo;
          $localStorage.startDate = Date.now();
          $scope.$storage = $localStorage;
          console.log($scope.$storage);
          idiomaselect = adata.user.lang;
          
          $scope.loagind = false;
          if (adata.user.type === '1') {
            $location.path('/sponzors/dashboard');
          } else {
            $location.path('/organizers/dashboard');
          }
        } else {
          $scope.error_log[0] = 'UnactivatedAccount';
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }

      }).error(function() {
        $scope.loagind = false;
        ngDialog.open({
          template: 'errorloging.html'
        });
      });
    }
  };
}

angular.module('sponzorme')
.controller('LoginController', LoginController);

})();
