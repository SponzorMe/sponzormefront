'use strict';
(function(){

function SponzorsSettingsController($scope, $translate, $sessionStorage, userRequest, $localStorage, imgurRequest, $location, $rootScope) {
  $rootScope.userValidation('1');
  $scope.emailuser = $sessionStorage.email;
  $scope.account = [];
  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.account = adata.data.user;
    });
  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.todo = sponzormeObj.perk_tasks;
    $scope.sponzors = sponzormeObj.sponzorships;
    $scope.account = sponzormeObj;
  }
  $scope.file = false; //By default no file to update.
  $scope.editAccount = function() {
    $scope.loadingEditAccount = true;
    $scope.account.location = $scope.account.location.formatted_address;
    if ($scope.file) {
      var params = {
        image: $scope.file.base64,
        type: 'base64'
      };
      imgurRequest.uploadImage(params).success(function(data) {
        $scope.account.image = data.data.link;
        userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $localStorage.$reset();
          $scope.loadingEditAccount = false;
          $scope.file = false;
        }).error(function(eData) {
          console.log(eData);
        });
      });
    } else {
      userRequest.editUserPatch($sessionStorage.id, $scope.account).success(function(adata) {
        $scope.account = adata.User;
        $localStorage.$reset();
        $scope.loadingEditAccount = false;
        $scope.file = false;
      });
    }
  };
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.menuprincipal = 'views/sponzors/menu.html';
}
angular.module('sponzorme')
.controller('SponzorsSettingsController', SponzorsSettingsController);
})();
