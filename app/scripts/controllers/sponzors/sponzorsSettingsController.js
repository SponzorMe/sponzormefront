'use strict';
(function(){

function SponzorsSettingsController($scope, $translate, userRequest, $localStorage, imgurRequest, $location, $rootScope) {
  $rootScope.userValidation('1');
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
        userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $localStorage.$reset();
          $scope.loadingEditAccount = false;
          $scope.file = false;
        }).error(function(eData) {
          console.log(eData);
        });
      });
    } else {
      userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
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
