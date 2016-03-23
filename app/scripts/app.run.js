/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function () {
  'use strict';
  angular.module('sponzorme').run(
    ['$rootScope', '$translate', '$location', 'allInterestsServiceRequest', '$filter', '$localStorage', 'userRequest', '$firebaseArray',
      function ($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $localStorage, userRequest, $firebaseArray, EXPIRATIONTIME) {
          var host = window.location.href;
          if (window.location.protocol === 'http:' && host.indexOf('localhost') <= -1) {
            var aux = host.replace('http:', 'https:');
            window.location.href = aux;
          }
          $rootScope.sendFirebaseNotification = function (notification, to) {
            notification.date = new Date().getTime();
            var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + to);
            var notifications = $firebaseArray(notificationsRef);
            notifications.$add(notification);
          };
          /*
           * Author: Sebastian Gomez
           * This function allows change the language whatever be the route
           * for this reason this is a global function
           */
          $rootScope.changeLanguage = function (key) {
            $translate.use(key);
          };
          /*
           * Author: Sebastian Gomez
           * This function return the current languaje used in the application
           */
          $rootScope.currentLanguage = function () {
            return $translate.use();
          };

          $rootScope.isExpiredData = function () {
            if ($localStorage.startDate) {
              var dataTime = new Date($localStorage.startDate);
              var timer = parseInt(EXPIRATIONTIME * 24 * 60 * 60 * 1000);
              var dataExpDate = new Date(dataTime.getTime() + timer);
              if (Date.now() > dataExpDate.getTime()) {
                $localStorage.$reset();
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          };
          $rootScope.getExtension = function (filename) {
            return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
          };
          $rootScope.uniqueString = function () {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 8; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
          };
          $rootScope.userValidation = function (shouldType) {
            host = window.location.href;
            $rootScope.isExpiredData();
            if ($localStorage.email && $localStorage.id > 0 && $localStorage.token && $localStorage.type === shouldType && $localStorage.user) {
              $rootScope.$storage = $localStorage;
              return true;
            } else {
              $localStorage.redirectTo = host;
              $location.path('/login');
              return false;
            }
          };
        }]);
})();
