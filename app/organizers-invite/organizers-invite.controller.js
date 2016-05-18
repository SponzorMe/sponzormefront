(function () {
  'use strict';
  function OrganizersInviteController($scope, $translate, userRequest, $rootScope, $localStorage, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id }; //Define the object to be used.
      //This function invites to a friend to use our platform.
      vm.inviteFriend = function () {
        dialogRequest.showLoading();
        userRequest.invitedUser(vm.friend).then(function successCallback(adata) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'inviteFiendEmailSent', false);
          vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id };
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersInviteController', OrganizersInviteController);
  OrganizersInviteController.$inject=['$scope', '$translate', 'userRequest', '$rootScope', '$localStorage', 'dialogRequest'];
})();
