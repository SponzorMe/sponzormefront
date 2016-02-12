'use strict';
(function() {
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    $scope.route = $route.current.loadedTemplateUrl;
    console.log('esta es la ruta:', $scope.route);
    
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
        'tasks': {
          'tasks': 'views/sponzors/dashboard/tasks.html',
          'task' : 'views/sponzors/dashboard/taskId.html',
          'tasksCreate': 'views/sponzors/dashboard/tasks_create.html'
        },
        'notifications': {
          'notifications': 'views/sponzors/notifications/notifications.html',
          'notificationId': 'views/sponzors/notifications/notification_detail.html',
          'notificationReply': 'views/sponzors/notifications/notification_reply.html',
          'notificationsReaded': 'views/sponzors/notifications/notifications_readed.html',
          'notificationsImportant': 'views/sponzors/notifications/notifications_importants.html'
        },
        'settings': {
          'profile': 'views/sponzors/dashboard/settings_profile.html',
          'preferences': 'views/sponzors/dashboard/settings_preferences.html',
          'ratings': 'views/sponzors/dashboard/settings_ratings.html'
        }
    };

    $scope.statesOrganizers = {
        'dashboard': {
          'dashboard': 'views/organizers/dashboard/main.html',
          'addEvent': 'views/organizers/dashboard/add_event.html',
          'eventId': 'views/event.html'
        },
        'sponzoring': {
          'sponzoring': 'views/organizers/dashboard/organizerships.html',
          'sponzoringId': 'views/organizers/dashboard/organizershipsId.html'
        },
        'following': 'views/organizers/dashboard/following.html',
        'tasks': {
          'tasks': 'views/organizers/dashboard/tasks.html',
          'task' : 'views/organizers/dashboard/taskId.html',
          'tasksCreate': 'views/organizers/dashboard/tasks_create.html'
        },
        'notifications': {
          'notifications': 'views/organizers/notifications/notifications.html',
          'notificationId': 'views/organizers/notifications/notification_detail.html',
          'notificationReply': 'views/organizers/notifications/notification_reply.html',
          'notificationsReaded': 'views/organizers/notifications/notifications_readed.html',
          'notificationsImportant': 'views/organizers/notifications/notifications_importants.html'
        },
        'settings': {
          'profile': 'views/organizers/dashboard/settings_profile.html',
          'preferences': 'views/organizers/dashboard/settings_preferences.html',
          'ratings': 'views/organizers/dashboard/settings_ratings.html'
        }
    };

    $scope.getRoute = function(route1, route2, route3, route4, route5) {
      
      if($scope.route === route1 || $scope.route === route2 || $scope.route === route3 || $scope.route === route4 || $scope.route === route5) {
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
