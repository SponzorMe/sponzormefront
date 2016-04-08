'use strict';
(function() {
  function NotificationController($scope, $translate, $localStorage, $firebaseArray, $rootScope, userRequest) {
    if($localStorage.id){
      $scope.help = 0;
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/'+$localStorage.id);
      $scope.notifications = $firebaseArray(notificationsRef);
      notificationsRef.on('child_added', function(snapshot) {
        var current = snapshot.val();
        if($localStorage.lastUpdate < current.date){
          userRequest.home($localStorage.id).then(function successCallback(response) {
            $localStorage.lastUpdate = new Date().getTime();
            $scope.user = response.data.data.user;
            $localStorage.user = JSON.stringify($scope.user);
          });
        }
      });
    }
  }
  angular.module('sponzorme').controller('NotificationController', NotificationController);
})();
