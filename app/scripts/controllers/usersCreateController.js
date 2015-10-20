'use strict';
(function(){
angular.module("sponzorme")
.controller('UsersCreateController', function($scope, $translate, $sessionStorage, userRequest, ngDialog, usSpinnerService, $location, $localStorage) {

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }

  $scope.sendfrom = function() {
    $scope.error_log = [];
    if ($scope.passwordone != undefined || $scope.passwordtwo != undefined) {
      if ($scope.passwordone == $scope.passwordtwo) {
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.passwordone;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect;
        $scope.objuser.type = 0;
        $scope.objuser.name = $scope.name + " " + $scope.lastname;
        $scope.loagind = true;

        userRequest.createUser($scope.objuser).success(function(adata) {

          if (adata.message == "Inserted") {
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
            $location.path("/customization");
          }
        }).error(function(data) {
          if (data.message == "Not inserted") {
            if (data.error.email) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterEmail'));
            }
            if (data.error.name) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterName'));
            }
            if (data.error.lastname) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterLastname'));
            }
            if (data.error.password) {
              $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
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
      $scope.error_log.push(eval('translations' + idiomaselect.toUpperCase() + '.errorRegisterPassword'));
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }
  };
});
})();
