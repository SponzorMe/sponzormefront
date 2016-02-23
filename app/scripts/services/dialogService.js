
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
        closeLoading: function(){
          $mdDialog.hide();
          $mdDialog.cancel();
        }
    };
  }
  angular.module('sponzorme').factory('dialogRequest', dialogRequest);
})();
