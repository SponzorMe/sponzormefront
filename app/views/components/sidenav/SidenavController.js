'use strict';
(function() {
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    var route = $route.current.loadedTemplateUrl;
    console.log('This is the route:', route);
    
    var statesSponzors = {
        'dashboard': [
          'scripts/sponzors-main/main.html',
          'scripts/sponzors-outstanding/outstanding.html',
          'scripts/event.html'
        ],

        'sponzoring': [
          'scripts/sponzors-sponzoring/sponzorships.html',
          'scripts/sponzors-sponzoring/sponzorshipsId.html'
        ],

        'tasks': [
          'scripts/sponzors-tasks/tasks.html',
          'scripts/sponzors-tasks/taskId.html',
          'scripts/sponzors-tasks/tasks_create.html'
        ],

        'notifications': [
          'scripts/sponzors-notifications/notifications.html',
          'scripts/sponzors-notifications/detail.html',
          'scripts/sponzors-notifications/readed.html',
          'scripts/sponzors-notifications/importants.html'
        ],

        'settings': [
          'scripts/sponzors-settings/profile.html',
          'scripts/sponzors-settings/preferences.html',
          'scripts/sponzors-settings/ratings.html'
        ],

        'saved': [
          'scripts/sponzors-saved/saved.html'
        ]
    };

    var statesOrganizers = {
        'dashboard': [
          'scripts/organizers-main/main.html', 
          'scripts/organizers-balance/balance.html', 
          'scripts/organizers-sponzors/sponzors.html', 
          'scripts/organizers-main/record.html'
        ],

        'sponzoring': [
          'scripts/organizers/dashboard/organizerships.html',
          'scripts/organizers/dashboard/organizershipsId.html'
        ],

        'following': [
          'scripts/organizers/dashboard/following.html'
        ],

        'news': [
          'scripts/organizers-news/news.html'
        ],

        'tasks': [
          'scripts/organizers-tasks/tasks.html',
          'scripts/organizers-tasks/tasks_create.html',
          'scripts/organizers-tasks/taskId.html'
        ],

        'notifications': [
          'scripts/organizers-notifications/detail.html',
          'scripts/organizers-notifications/importants.html',
          'scripts/organizers-notifications/notifications.html',
          'scripts/organizers-notifications/readed.html'
        ],

        'settings': [
          'scripts/organizers-settings/profile.html',
          'scripts/organizers-settings/preferences.html',
          'scripts/organizers-settings/rate.html'
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