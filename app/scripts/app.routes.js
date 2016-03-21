/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function () {
  'use strict';
  angular.module('sponzorme').config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      .when('/login', {
        templateUrl: 'scripts/login/login.html',
        controller: 'LoginController'
      })

      .when('/logout', {
        templateUrl: 'scripts/login/login.html',
        controller: 'LogoutController'
      })

      //Sponzors
      .when('/sponzors/dashboard', {
        templateUrl: 'scripts/sponzors-main/main.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/outstanding', {
        templateUrl: 'scripts/sponzors-outstanding/outstanding.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/saved', {
        templateUrl: 'scripts/sponzors-saved/saved.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/settings/profile', {
        templateUrl: 'scripts/sponzors-settings/profile.html',
        controller: 'SponzorsProfileController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/preferences', {
        templateUrl: 'scripts/sponzors-settings/preferences.html',
        controller: 'SponzorsPreferencesController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/ratings', {
        templateUrl: 'scripts/sponzors-settings/ratings.html',
        controller: 'SponzorsRatingsController',
        controllerAs: 'src'
      })
      .when('/sponzors/sponzoring', {
        templateUrl: 'scripts/sponzors-sponzoring/sponzorships.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/sponzoring/:id', {
        templateUrl: 'scripts/sponzors-sponzoring/sponzorshipsId.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/tasks', {
        templateUrl: 'scripts/sponzors-tasks/tasks.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/task/:id', {
        templateUrl: 'scripts/sponzors-tasks/taskId.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/tasks/create', {
        templateUrl: 'scripts/sponzors-tasks/tasks_create.html',
        controller: 'SponzorsCreateTasksController',
        controllerAs: 'sctc'
      })
      .when('/sponzors/notifications', {
        templateUrl: 'scripts/sponzors-notifications/notifications.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/importants', {
        templateUrl: 'scripts/sponzors-notifications/importants.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/readed', {
        templateUrl: 'scripts/sponzors-notifications/readed.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notification/:id', {
        templateUrl: 'scripts/sponzors-notifications/detail.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/event/:eventId', {
        templateUrl: 'scripts/sponzors-event/event.html',
        controller: 'SponzorsEventController',
        controllerAs: 'sec'
      })
      .when('/sponzors/invite', {
        templateUrl: 'scripts/sponzors-invite/invite.html',
        controller: 'SponzorsInviteController',
        controllerAs: 'sic'
      })
      .when('/sponzors/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'scripts/sponzors-chat/chat.html',
        controller: 'SponzorsChatController',
        controllerAs: 'scc'
      })
      .when('/sponzors/rate/sponzorship/:sponzorshipId', {
        templateUrl: 'scripts/sponzors-rate/rate-form.html',
        controller: 'SponzorsRateController',
        controllerAs: 'src'
      })

      //Organizers
      .when('/organizers/dashboard', {
        templateUrl: 'scripts/organizers-main/main.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/sponzors', {
        templateUrl: 'scripts/organizers-sponzors/sponzors.html',
        controller: 'OrganizersSponzorsController',
        controllerAs: 'osc'
      })
      .when('/organizers/balance', {
        templateUrl: 'scripts/organizers-balance/balance.html',
        controller: 'OrganizersBalanceController',
        controllerAs: 'obc'
      })
      .when('/organizers/event/record', {
        templateUrl: 'scripts/organizers-main/record.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/news', {
        templateUrl: 'scripts/organizers-news/news.html',
        controller: 'OrganizersNewsController',
        controllerAs: 'onc'
      })
      //Organizers Notifications
      .when('/organizers/notifications', {
        templateUrl: 'scripts/organizers-notifications/notifications.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/importants', {
        templateUrl: 'scripts/organizers-notifications/importants.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/readed', {
        templateUrl: 'scripts/organizers-notifications/readed.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notification/:id', {
        templateUrl: 'scripts/organizers-notifications/detail.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      //Organizers Settings
      .when('/organizers/settings/profile',{
          templateUrl: 'scripts/organizers-settings/profile.html',
          controller: 'OrganizersProfileController',
          controllerAs: 'opc'
      })
      .when('/organizers/settings/preferences',{
          templateUrl: 'scripts/organizers-settings/preferences.html',
          controller: 'OrganizersPreferencesController',
          controllerAs: 'opc'
      })
      .when('/organizers/settings/rate',{
          templateUrl: 'scripts/organizers-settings/rate.html',
          controller: 'OrganizersRateController',
          controllerAs: 'orc'
      })
      //Organizers Tasks
      .when('/organizers/tasks', {
        templateUrl: 'scripts/organizers-tasks/tasks.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/task/:id', {
        templateUrl: 'scripts/organizers-tasks/taskId.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/tasks/create', {
        templateUrl: 'scripts/organizers-tasks/tasks_create.html',
        controller: 'OrganizersCreateTasksController',
        controllerAs: 'octc'
      })
      .when('/organizers/event/:eventId', {
        templateUrl: 'scripts/organizers-event-edit/edit.html',
        controller: 'OrganizersEventEditController',
        controllerAs: 'oeec'
      })
      .when('/organizers/add/event', {
        templateUrl: 'scripts/organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .otherwise({
          redirect:'/login'
      });
  }]);
})();
