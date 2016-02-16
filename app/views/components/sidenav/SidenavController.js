'use strict';
(function() {
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    var route = $route.current.loadedTemplateUrl;
    console.log('This is the route:', route);
    
    var statesSponzors = {
        'dashboard': [
          'views/sponzors/dashboard/main.html',
          'views/sponzors/dashboard/outstanding.html',
          'views/event.html'
        ],

        'sponzoring': [
          'views/sponzors/dashboard/sponzorships.html',
          'views/sponzors/dashboard/sponzorshipsId.html'
        ],

        'following': [
          'views/sponzors/dashboard/following.html'
        ],

        'tasks': [
          'views/sponzors/dashboard/tasks.html',
          'views/sponzors/dashboard/taskId.html',
          'views/sponzors/dashboard/tasks_create.html'
        ],

        'notifications': [
          'views/sponzors/notifications/notifications.html',
          'views/sponzors/notifications/notification_detail.html',
          'views/sponzors/notifications/notification_reply.html',
          'views/sponzors/notifications/notifications_readed.html',
          'views/sponzors/notifications/notifications_importants.html'
        ],

        'settings': [
          'views/sponzors/dashboard/settings_profile.html',
          'views/sponzors/dashboard/settings_preferences.html',
          'views/sponzors/dashboard/settings_ratings.html'
        ]
    };

    var statesOrganizers = {
        'dashboard': [
          'views/organizers/dashboard/main.html', 'views/organizers/dashboard/add_event.html', 'views/event.html', 'views/organizers/dashboard/sponzorships.html', 'views/organizers/dashboard/historical.html', 'views/organizers/chat.html'
        ],

        'sponzoring': [
          'views/organizers/dashboard/organizerships.html',
          'views/organizers/dashboard/organizershipsId.html'
        ],

        'following': [
          'views/organizers/dashboard/following.html'
        ],

        'news': [
          'views/organizers/dashboard/news.html'
        ],

        'tasks': [
          'views/organizers/dashboard/tasks.html',
          'views/organizers/dashboard/taskId.html',
          'views/organizers/dashboard/tasks_create.html'
        ],

        'notifications': [
          'views/organizers/notifications/notifications.html',
          'views/organizers/notifications/notification_detail.html',
          'views/organizers/notifications/notification_reply.html',
          'views/organizers/notifications/notifications_readed.html',
          'views/organizers/notifications/notifications_importants.html'
        ],

        'settings': [
          'views/organizers/dashboard/settings_profile.html',
          'views/organizers/dashboard/settings_preferences.html',
          'views/organizers/dashboard/settings_ratings.html'
        ]
    };

    $scope.dashboard = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.dashboard.length; i++) {
          if (statesOrganizers.dashboard[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.dashboard.length; i++) {
          if (statesSponzors.dashboard[i] === route) {
            return true
          }
        };
      }
    }

    $scope.sponzoring = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.sponzoring.length; i++) {
          if (statesOrganizers.sponzoring[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.sponzoring.length; i++) {
          if (statesSponzors.sponzoring[i] === route) {
            return true
          }
        };
      }
    }

    $scope.following = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.following.length; i++) {
          if (statesOrganizers.following[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.following.length; i++) {
          if (statesSponzors.following[i] === route) {
            return true
          }
        };
      }
    }

    $scope.news = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.news.length; i++) {
          if (statesOrganizers.news[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.news.length; i++) {
          if (statesSponzors.news[i] === route) {
            return true
          }
        };
      }
    }

    $scope.tasks = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.tasks.length; i++) {
          if (statesOrganizers.tasks[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.tasks.length; i++) {
          if (statesSponzors.tasks[i] === route) {
            return true
          }
        };
      }
    }

    $scope.notifications = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.notifications.length; i++) {
          if (statesOrganizers.notifications[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.notifications.length; i++) {
          if (statesSponzors.notifications[i] === route) {
            return true
          }
        };
      }
    }

    $scope.settings = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.settings.length; i++) {
          if (statesOrganizers.settings[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.settings.length; i++) {
          if (statesSponzors.settings[i] === route) {
            return true
          }
        };
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
