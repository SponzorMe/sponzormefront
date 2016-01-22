'use strict';
(function() {

  function OrganizersFriendController($scope, $translate, $localStorage, userRequest, $rootScope) {
    if ($rootScope.userValidation('0')) {
      //Vars initialization
      $scope.section = {
        route: 'InviteFriend',
        title: 'Invite Friend'
      };
      $scope.friend = {};
      $scope.friend.email = '';
      $scope.friend.message = '';
      $scope.emailuser = $localStorage.email;
      //Vars initialization ends

      //This function invites to a friend to use our platform.
      $scope.invitefriend = function() {
        $scope.loadingInvite = true;
        $rootScope.showLoading();
        $scope.objuserinv = {};
        $scope.objuserinv.user_id = $localStorage.id;
        $scope.objuserinv.email = $scope.friend.email;
        $scope.objuserinv.message = $scope.friend.message;
        userRequest.invitedUser($scope.objuserinv).success(function(adata) {
          $scope.friend.tempEmail = $scope.friend.email;
          $scope.friend.email = '';
          $scope.friend.message = '';
          if (adata.code === '200') {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'inviteFiendEmailSent', false);
          } else {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'problem', false);
          }
          $scope.loadingInvite = false;
        });
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersFriendController', OrganizersFriendController);

})();
