'use strict';
(function() {

  function NotificationController($scope, $translate, $localStorage, $location, $firebaseArray, FURL) {
    console.log($localStorage);
    $scope.help = 0;
    var notificationsRef = new Firebase(FURL+"notifications");
    var query = notificationsRef.orderByChild("to").equalTo($localStorage.id).limitToLast(25);
    $scope.notifications = $firebaseArray(query);
    $scope.notifications.$loaded().then(function() {
      $scope.help = $scope.notifications.length;
    });
    notificationsRef.orderByChild("to").equalTo($localStorage.id).on("child_added", function() {
        $scope.help++;
    });
    notificationsRef.orderByChild("to").equalTo($localStorage.id).on("child_removed", function() {
        $scope.help--;
    });
    //$firebaseArray, FURL
    //var notificationsRef = new Firebase(FURL+"notifications");
    //var notifications = $firebaseArray(notificationsRef);
};
angular.module('sponzorme')
    .controller('NotificationController', NotificationController);
})();
