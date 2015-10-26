'use strict';
(function(){

function OrganizersFriendController($scope, $translate, $sessionStorage, userRequest, ngDialog, $location, $rootScope) {
  $rootScope.userValidation("0");
  $scope.friend = {};
  $scope.friend.email = '';
  $scope.friend.message = '';
  $scope.invitefriend = function() {
    $scope.loadingInvite = true;
    $scope.objuserinv = {};
    $scope.objuserinv.user_id = $sessionStorage.id;
    $scope.objuserinv.email = $scope.friend.email;
    $scope.objuserinv.message = $scope.friend.message;
    userRequest.invitedUser($scope.objuserinv).success(function(adata) {
      $scope.friend.tempEmail = $scope.friend.email;
      $scope.friend.email = '';
      $scope.friend.message = '';
      if (adata.code === "200") {
        ngDialog.open({
          template: 'emailsend.html',
          scope: $scope
        });

      } else {
        ngDialog.open({
          template: 'errorsend.html'
        });
      }
      $scope.loadingInvite = false;
    });
  };

  $scope.emailuser = $sessionStorage.email;

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersFriendController', OrganizersFriendController);

})();
