'use strict';
(function() {
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    $scope.route = $route.current.loadedTemplateUrl;
    $scope.statesSponzors = {
        'dashboard': {
          'dashboard': 'views/sponzors/dashboard/main.html',
          'outstanding': 'views/sponzors/dashboard/outstanding.html',
          'eventId': 'views/event.html'
        },
        'sponzoring': {
          'sponzoring': 'views/sponzors/dashboard/sponzorships.html',
          'sponzoringId': 'views/sponzors/dashboard/sponzorshipsId.html'
        },
        'following': 'views/sponzors/dashboard/following.html',
        'tasks': 'views/tasks.html',
        'notifications': {
          'notifications': 'views/sponzors/notifications/notifications.html',
          'notificationId': 'views/sponzors/notifications/notification_detail.html',
          'notificationReply': 'views/sponzors/notifications/notification_reply.html',
        },
        'settings': {
          'profile': 'views/sponzors/dashboard/settings_profile.html',
          'preferences': 'views/sponzors/dashboard/settings_preferences.html'
        }
    };

    $scope.getRoute = function(route1, route2, route3) {
      if($scope.route === route1 || $scope.route === route2 || $scope.route === route3) {
        return true;
      }
    }

    $scope.openMenu = function($mdOpenMenu, $event) {
      $scope.originatorEv = $event;
      $mdOpenMenu($event);
    };

    $scope.openSidenavLeft = function(){
      $mdSidenav('left').toggle();
    };

    $scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

}
  angular.module('sponzorme')
    .controller('SidenavController', SidenavController);

})();
