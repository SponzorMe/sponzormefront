
(function () {
    'use strict';
    angular.module('sponzorme').factory('firebaseRequest', firebaseRequest);
    firebaseRequest.$inject = ['$firebaseArray', '$rootScope'];
    function firebaseRequest($firebaseArray, $rootScope) {
        return {
            sendNotification: function (notification, to) {
                notification.date = new Date().getTime();
                var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + to);
                var notifications = $firebaseArray(notificationsRef);
                notifications.$add(notification);
            }
        }
    };
})();
