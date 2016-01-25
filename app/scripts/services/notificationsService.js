/**
 * @Servicio de Categories
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function notificationRequest($http, $rootScope) {
    return {
      /**
       * Get all categories
       * @returns promise
       */
      sendNotificationFirebase: function() {

      },
      sendNotificatonEmail: function(){

      },
      getFirebaseNotifications: function(){
        return $http.get($rootScope.getConstants().FIREBASEURL + '/notifications');
      }
    };
  }
  angular.module('sponzorme').factory('notificationRequest', notificationRequest);
})();
