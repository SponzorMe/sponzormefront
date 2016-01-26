'use strict';
(function() {
  function NotificationController($scope, $translate, $localStorage, $firebaseArray, $rootScope) {
    if($localStorage.id){
      $scope.help = 0;
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/'+$localStorage.id);
      $scope.notifications = $firebaseArray(notificationsRef);
      notificationsRef.on('child_added', function() {
        $scope.help++;
      });
      notificationsRef.on('child_removed', function() {
        $scope.help--;
      });
    }
  }
  angular.module('sponzorme').controller('NotificationController', NotificationController);
})();
