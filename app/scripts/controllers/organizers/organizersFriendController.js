'use strict';
(function(){

function OrganizersFriendController($scope, $translate, $sessionStorage, userRequest, ngDialog, $location) {

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
      if (adata.code === 200) {
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
