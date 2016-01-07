'use strict';
(function() {
  function NotificationController($scope, $translate, $localStorage, $location, $firebaseArray, $rootScope) {
    if($localStorage.id){
      $scope.help = 0;
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
      var query = notificationsRef.orderByChild('to').equalTo($localStorage.id).limitToLast(25);
      $scope.notifications = $firebaseArray(query);
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_added', function() {
        $scope.help++;
      });
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_removed', function() {
        $scope.help--;
      });
    }
  }
  angular.module('sponzorme')
    .controller('NotificationController', NotificationController);
})();
