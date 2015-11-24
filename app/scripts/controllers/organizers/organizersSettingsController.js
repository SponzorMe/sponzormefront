'use strict';
(function() {

  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, imgurRequest, $location, $rootScope, ngDialog) {

    $rootScope.userValidation('0');
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    userRequest.oneUser($localStorage.id).success(function(adata) {
      $scope.account = adata.data.user;
      ngDialog.closeAll();
    });

    $scope.account = [];

    $scope.file = false; //By default no file to update.
    $scope.editAccount = function() {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      $scope.account.location = $scope.account.location.formatted_address;
      if ($scope.file) {
        var params = {
          image: $scope.file.base64,
          type: 'base64'
        };
        imgurRequest.uploadImage(params).success(function(data) {
          $scope.account.image = data.data.link;
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.file = false;
            ngDialog.closeAll();
            $scope.message = 'accountInfoEditedSuccessfuly';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });
          }).error(function(eData) {
            ngDialog.closeAll();
            $scope.message = 'errorEditingAccountInfo';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        });
      } else {
        userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $scope.file = false;
          ngDialog.closeAll();
          $scope.message = 'accountInfoEditedSuccessfuly';
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });
        }).error(function(eData) {
          ngDialog.closeAll();
          $scope.message = 'errorEditingAccountInfo';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });;
      }
    };

    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };

    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersSettingsController', OrganizersSettingsController);

})();
