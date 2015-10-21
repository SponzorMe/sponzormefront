'use strict';
(function(){
angular.module('sponzorme')
.controller('LoginController', LoginController);

function LoginController($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog) {

  delete $sessionStorage.cookiesponzorme;

  delete $sessionStorage.typesponzorme;

  delete $sessionStorage.token;

  delete $sessionStorage.developer;

  delete $sessionStorage.id;

  delete $sessionStorage.email;

  $localStorage.$reset();

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie === undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini !== undefined) {
      if (typeini === '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path('/');
  }

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
          $sessionStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
          $sessionStorage.typesponzorme = adata.user.type;
          $sessionStorage.token = btoa($scope.email + ':' + $scope.password);
          $sessionStorage.id = adata.user.id;
          $sessionStorage.email = adata.user.email;
          idiomaselect = adata.user.lang;
          var url = $location.host();
          if (url === 'localhost') {
            $sessionStorage.developer = 1;
          }
          $scope.loagind = false;
          if (adata.user.type === 1) {
            $location.path('/sponzors/dashboard');
          } else {
            $location.path('/organizers/dashboard');
          }
        } else {
          $scope.error_log[0] = eval('translations' + idiomaselect.toUpperCase() + '.UnactivatedAccount');
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }

      }).error(function(edata) {
        $scope.loagind = false;
        ngDialog.open({
          template: 'errorloging.html'
        });
      });
    }
  };
};
})();
