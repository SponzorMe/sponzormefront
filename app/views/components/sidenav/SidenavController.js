'use strict';
(function() {
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    var route = $route.current.loadedTemplateUrl;
    console.log('This is the route:', route);
    
    var statesSponzors = {
        'dashboard': [
          'sponzors-main/main.html',
          'sponzors-outstanding/outstanding.html',
          'event.html'
        ],

        'sponzoring': [
          'sponzors-sponzoring/sponzorships.html',
          'sponzors-sponzoring/sponzorshipsId.html'
        ],

        'tasks': [
          'sponzors-tasks/tasks.html',
          'sponzors-tasks/taskId.html',
          'sponzors-tasks/tasks_create.html'
        ],

        'notifications': [
          'sponzors-notifications/notifications.html',
          'sponzors-notifications/detail.html',
          'sponzors-notifications/readed.html',
          'sponzors-notifications/importants.html'
        ],

        'settings': [
          'sponzors-settings/profile.html',
          'sponzors-settings/preferences.html',
          'sponzors-settings/ratings.html'
        ],

        'saved': [
          'sponzors-saved/saved.html'
        ]
    };

    var statesOrganizers = {
        'dashboard': [
          'organizers-main/main.html', 
          'organizers-balance/balance.html', 
          'organizers-sponzors/sponzors.html', 
          'organizers-main/record.html'
        ],

        'sponzoring': [
          'organizers/dashboard/organizerships.html',
          'organizers/dashboard/organizershipsId.html'
        ],

        'following': [
          'organizers/dashboard/following.html'
        ],

        'news': [
          'organizers-news/news.html'
        ],

        'tasks': [
          'organizers-tasks/tasks.html',
          'organizers-tasks/tasks_create.html',
          'organizers-tasks/taskId.html'
        ],

        'notifications': [
          'organizers-notifications/detail.html',
          'organizers-notifications/importants.html',
          'organizers-notifications/notifications.html',
          'organizers-notifications/readed.html'
        ],

        'settings': [
          'organizers-settings/profile.html',
          'organizers-settings/preferences.html',
          'organizers-settings/rate.html'
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

    $scope.saved = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.saved.length; i++) {
          if (statesOrganizers.saved[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.saved.length; i++) {
          if (statesSponzors.saved[i] === route) {
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
