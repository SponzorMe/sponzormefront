
(function() {
  'use strict';
    function dialogRequest($mdDialog) {
      return {
        showLoading: function(){
          var parentEl = angular.element(document.body);
          $mdDialog.show({
            parent: parentEl,
            templateUrl: 'views/templates/loadingDialog.html'
          });
        },
        showDialog: function(type, message, redirect){
          var parentEl = angular.element(document.body);
          if(type === 'error'){
            var template = 'views/templates/errorDialog.html';
          }
          else if(type === 'success'){
            var template = 'views/templates/successDialog.html';
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
})();
