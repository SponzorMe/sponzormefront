'use strict';
(function() {

  function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, usSpinnerService, $localStorage, eventRequest, perkRequest, $routeParams) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      idiomaselect = $routeParams.lang;
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = idiomaselect;
          $scope.objuser.type = 1;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
          ngDialog.open({
            template: 'views/templates/loadingDialog.html',
            showClose: false
          });
          userRequest.createUser($scope.objuser).success(function(adata) {
            if (adata.message === 'Inserted') {
              $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.typesponzorme = adata.User.type;
              $localStorage.id = adata.User.id;
              $localStorage.email = adata.User.email;
              $localStorage.demo = adata.User.demo;
              $localStorage.startDate = Date.now();
              $localStorage.newUser = true;
              $localStorage.$apply();
              $scope.loagind = false;
              $location.path('/customization');
              ngDialog.closeAll();
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                $scope.errorMessages.push('errorRegisterEmail');
              }
              if (data.error.name) {
                $scope.errorMessages.push('errorRegisterName');
              }
              if (data.error.lastname) {
                $scope.errorMessages.push('errorRegisterLastname');
              }
              if (data.error.password) {
                $scope.errorMessages.push('errorRegisterPassword');
              }
            }
            $scope.loagind = false;
            ngDialog.closeAll();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if ($scope.passwordtwo.length > 6) {
            $scope.message = 'errorRegisterPasswordNoMatch';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          } else {
            $scope.message = 'errorRegisterShortPassword';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }
      } else {
        $scope.message = 'errorRegisterPasswordNoEmpty';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };
  }
  angular.module('sponzorme')
    .controller('SponzorsCreateController', SponzorsCreateController);
})();
