'use strict';
(function() {

  function SponzorsFriendController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage) {

    $rootScope.userValidation('1');
    //Vars initialization
    $scope.friend = {};
    $scope.friend.email = '';
    $scope.friend.message = '';
    $scope.emailuser = $localStorage.email;
    //Vars initialization ends

    //This function invites to a friend to use our platform.
    $scope.invitefriend = function() {
      $scope.loadingInvite = true;
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      });
      $scope.objuserinv = {};
      $scope.objuserinv.user_id = $localStorage.id;
      $scope.objuserinv.email = $scope.friend.email;
      $scope.objuserinv.message = $scope.friend.message;
      userRequest.invitedUser($scope.objuserinv).success(function(adata) {
        $scope.friend.tempEmail = $scope.friend.email;
        $scope.friend.email = '';
        $scope.friend.message = '';
        if (adata.code === '200') {
          ngDialog.closeAll();
          $scope.message = 'inviteFiendEmailSent';
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });

        } else {
          ngDialog.closeAll();
          $scope.message = 'problem';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        }
        $scope.loadingInvite = false;
      });
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
    .controller('SponzorsFriendController', SponzorsFriendController);

})();
