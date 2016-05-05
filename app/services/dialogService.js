
(function() {
  'use strict';
    function dialogRequest($mdDialog) {
      return {
        showLoading: function(){
          var parentEl = angular.element(document.body);
          $mdDialog.show({
            parent: parentEl,
            templateUrl: 'dialogs/loadingDialog.html'
          });
        },
        showDialog: function(type, message, redirect){
          var parentEl = angular.element(document.body);
          if(type === 'error'){
            var template = 'dialogs/errorDialog.html';
          }
          else if(type === 'success'){
            var template = 'dialogs/successDialog.html';
          }
          $mdDialog.show({
            parent: parentEl,
            templateUrl: template,
            locals: {
              message: message,
              redirect: redirect
            },
            controller: DialogController
          });
          function DialogController($scope, $mdDialog, message, redirect, $location) {
            $scope.message = message;
            $scope.redirect = redirect;
            $scope.closeDialog = function(){
              $mdDialog.hide();
              $mdDialog.cancel();
              if(redirect){
                console.log('Con redirect', redirect);
                $location.path(redirect);
              }
            };
          };
        },
        closeLoading: function(){
          $mdDialog.hide();
          $mdDialog.cancel();
        }
    };
  }
  angular.module('sponzorme').factory('dialogRequest', dialogRequest);
  dialogRequest.$inject = ['$mdDialog'];
})();
