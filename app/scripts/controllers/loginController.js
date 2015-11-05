'use strict';
(function() {

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
        ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
        loginRequest.login($scope.objuser).success(function(adata) {
          if (adata.user.activated === '1') {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
            $localStorage.typesponzorme = adata.user.type;
            $localStorage.token = btoa($scope.email + ':' + $scope.password);
            $localStorage.id = adata.user.id;
            $localStorage.email = adata.user.email;
            $localStorage.demo = adata.user.demo;
            $localStorage.image = adata.user.image;
            $localStorage.startDate = Date.now();
            $scope.$storage = $localStorage;
            idiomaselect = adata.user.lang;

            $scope.loagind = false;
            if (adata.user.type === '1') {
              $location.path('/sponzors/dashboard');
            } else {
              $location.path('/organizers/dashboard');
            }
            ngDialog.closeAll();
          } else {
            $scope.loagind = false;
            ngDialog.closeAll();
            $scope.message = 'unactivatedAccount';
            ngDialog.open({
              template: 'views/templates/unactivatedAccountDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }).error(function() {
          $scope.loagind = false;
          ngDialog.closeAll();
          $scope.message = 'invalidCredentials';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('LoginController', LoginController);

})();