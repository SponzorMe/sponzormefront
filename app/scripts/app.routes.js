/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function () {
  'use strict';
  angular.module('sponzorme').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
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








      /*.when('/organizers/tasks', {
        templateUrl: 'views/organizers/dashboard/tasks/tasks.html',
        controller: 'OrganizersTasksController'
      })
      .when('/organizers/task/:id', {
        templateUrl: 'views/organizers/dashboard/tasks/taskId.html',
        controller: 'OrganizersTasksController'
      })
      .when('/organizers/tasks/create', {
        templateUrl: 'views/organizers/dashboard/tasks/tasks_create.html',
        controller: 'OrganizersTasksController'
      })
      .when('/organizers/notifications', {
        templateUrl: 'views/organizers/notifications/notifications.html',
        controller: 'OrganizersNotificationsController'
      })
      .when('/organizers/notifications/importants', {
        templateUrl: 'views/organizers/notifications/notifications_importants.html',
        controller: 'OrganizersNotificationsController'
      })
      .when('/organizers/news', {
        templateUrl: 'views/organizers/dashboard/news.html',
        controller: 'OrganizersNotificationsController'
      })

      .when('/activation/:token', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })

      .when('/resend', {
        templateUrl: 'views/resend.html',
        controller: 'ResendController'
      })
      .when('/forgot', {
        templateUrl: 'views/forgot.html',
        controller: 'ForgotController'
      })
      .when('/reset/:tokenReset', {
        templateUrl: 'views/reset.html',
        controller: 'ForgotController'
      })
      .when('/sponzors/create', {
        templateUrl: 'views/sponzors/create.html',
        controller: 'SponzorsCreateController'
      })
      .when('/organizers/create', {
        templateUrl: 'views/organizers/create.html',
        controller: 'OrganizersCreateController'
      })
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LogoutController'
      })
      .when('/organizers/dashboard', {
        templateUrl: 'views/organizers/dashboard/main.html',
        controller: 'OrganizersMainController'
      })
      .when('/organizers/dashboard/historical', {
        templateUrl: 'views/organizers/dashboard/historical.html',
        controller: 'OrganizersHistoricalController'
      })
      .when('/organizers/events', {
        templateUrl: 'views/organizers/dashboard/events.html',
        controller: 'OrganizersEventsController'
      })
      .when('/organizers/sponzors', {
        templateUrl: 'views/organizers/dashboard/sponzorships.html',
        controller: 'OrganizersSponzorshipsController'
      })
      .when('/customization', {
        templateUrl: 'views/customization/customization.html',
        controller: 'CustomizationController'
      })
      .when('/organizers/friend', {
        templateUrl: 'views/organizers/dashboard/friend.html',
        controller: 'OrganizersFriendController'
      })

      .when('/organizers/settings', {
        templateUrl: 'views/organizers/dashboard/settings_profile.html',
        controller: 'OrganizersMasterController'
      })
      .when('/organizers/settings/profile', {
        templateUrl: 'views/organizers/dashboard/settings_profile.html',
        controller: 'OrganizersMasterController'
      })
      .when('/organizers/settings/preferences', {
        templateUrl: 'views/organizers/dashboard/settings_preferences.html',
        controller: 'OrganizersMasterController'
      })

      .when('/sponzors/friend', {
        templateUrl: 'views/sponzors/dashboard/friend.html',
        controller: 'SponzorsFriendController'
      })

      .when('/event/:eventId', {
        templateUrl: 'views/event.html',
        controller: 'EventPageController'
      })
      .when('/organizers/add/event', {
        templateUrl: 'views/organizers/dashboard/add_event.html',
        controller: 'OrganizersEventCreateController'
      })
      .when('/organizers/landing', {
        templateUrl: 'views/organizers/dashboard/landing.html',
        controller: 'OrganizersLandingController'
      })
      .when('/organizers/edit/event/:id', {
        templateUrl: 'views/organizers/dashboard/edit_event.html',
        controller: 'OrganizersMasterController'
      })
      .when('/sponzors/payment_complete/:sponzorship_id/:sponzor_id', {
        templateUrl: 'views/sponzors/dashboard/sponzorships.html',
        controller: 'SponzorsSponzorshipsController'
      })
      .when('/eventbrite/:eventBriteCode', {
        templateUrl: 'views/organizers/dashboard/add_event.html',
        controller: 'OrganizersEventCreateController'
      })
      .when('/meetup/:meetupCode', {
        templateUrl: 'views/organizers/dashboard/add_event.html',
        controller: 'OrganizersEventCreateController'
      })
      .when('/sponzors/rating/:sponzorshipId', {
        templateUrl: 'views/sponzors/dashboard/rateSponzorship.html',
        controller: 'SponzorsRatingController'
      })
      .when('/organizers/rating/:sponzorshipId', {
        templateUrl: 'views/organizers/dashboard/rateSponzorship.html',
        controller: 'OrganizersRatingController'
      })

      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      })
      .when('/support', {
        templateUrl: 'views/support.html'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/testimonials', {
        templateUrl: 'views/testimonials.html'
      })*/




      ;
  }]);
})();
