(function () {
    'use strict';

    function NotificationController($scope, userRequest, $localStorage, $rootScope, $firebaseArray) {

        if ($localStorage.id) {
            $scope.help = $localStorage.help;
            var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
            $scope.notifications = $firebaseArray(notificationsRef);
            notificationsRef.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if ($localStorage.lastUpdate < current.date) {
                    $localStorage.help = true;
                    $scope.help = true;
                    userRequest.home($localStorage.id).then(function successCallback(response) {
                        $localStorage.lastUpdate = new Date().getTime();
                        $scope.user = response.data.data.user;
                        if($scope.user.events){
                            $scope.user.events = $scope.user.events.filter(function(e){
                                e.starts = e.starts.replace(' ', 'T');
                                e.starts = new Date(e.starts).getTime();
                                return e;
                            });
                        }
                        $localStorage.user = JSON.stringify($scope.user);
                        $localStorage.$apply();
                    });
                }
            });
        }
    }
    angular.module('sponzorme').controller('NotificationController', NotificationController);
    NotificationController.$inject = ['$scope', 'userRequest', '$localStorage', '$rootScope', '$firebaseArray'];
})();