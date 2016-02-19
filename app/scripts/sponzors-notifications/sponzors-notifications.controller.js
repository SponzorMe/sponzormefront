(function () {
  'use strict';
  function SponzorsNotificationsController($scope, $rootScope, $localStorage, $firebaseArray, $firebaseObject, userRequest, $routeParams, $location) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      if ($routeParams.id) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + $routeParams.id);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.read = true;
          vm.currentNotification.$save();
        });
      }
      else {
        vm.notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
        vm.notifications = $firebaseArray(vm.notificationsRef);
        vm.notificationsRef.on('child_added', function (snapshot) {
          vm.current = snapshot.val();//extract the info
          if ($localStorage.lastUpdate < vm.current.date) {
            userRequest.home($localStorage.id).then(function successCallback(response) {
              $localStorage.lastUpdate = new Date().getTime();
              $localStorage.user = JSON.stringify(response.data.data.user);
            });
          }
        });
      }
      
      vm.markAsImportant = function (index) {
        console.log(index);
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.important = true;
          vm.currentNotification.$save();
        });
      };
      vm.delete = function (index) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.$remove();
          $location.path('/sponzors/notifications');
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsNotificationsController', SponzorsNotificationsController);
})();
