/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme').config(['$routeProvider', function($routeProvider) {
    $routeProvider

      .when('', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/logout', {
      templateUrl: 'login/login.html',
      controller: 'LogoutController',
      controllerAs: 'lc'
    })

    .when('/sign-up/sponsor', {
      templateUrl: 'sponzors-create/create.html',
      controller: 'SponzorsCreateController',
      controllerAs: 'scc'
    })

    .when('/sign-up/organizer', {
      templateUrl: 'organizers-create/create.html',
      controller: 'OrganizersCreateController',
      controllerAs: 'occ'
    })

    .when('/activation/:token', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
    
    .when('/forgot', {
      templateUrl: 'forgot/forgot.html',
      controller: 'ForgotController',
      controllerAs: 'fc'
    })
    
    .when('/reset/:tokenReset', {
      templateUrl: 'forgot/reset.html',
      controller: 'ForgotController',
      controllerAs: 'fc'
    })

    //Sponzors
    .when('/sponzors/dashboard', {
        templateUrl: 'sponzors-main/main.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/outstanding', {
        templateUrl: 'sponzors-outstanding/outstanding.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/saved', {
        templateUrl: 'sponzors-saved/saved.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/settings/profile', {
        templateUrl: 'sponzors-settings/profile.html',
        controller: 'SponzorsProfileController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/preferences', {
        templateUrl: 'sponzors-settings/preferences.html',
        controller: 'SponzorsPreferencesController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/ratings', {
        templateUrl: 'sponzors-settings/ratings.html',
        controller: 'SponzorsRatingsController',
        controllerAs: 'src'
      })
      .when('/sponzors/sponzoring', {
        templateUrl: 'sponzors-sponzoring/sponzorships.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/sponzoring/:id', {
        templateUrl: 'sponzors-sponzoring/sponzorshipsId.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/tasks', {
        templateUrl: 'sponzors-tasks/tasks.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/task/:id', {
        templateUrl: 'sponzors-tasks/taskId.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/tasks/create', {
        templateUrl: 'sponzors-tasks/tasks_create.html',
        controller: 'SponzorsCreateTasksController',
        controllerAs: 'sctc'
      })
      .when('/sponzors/notifications', {
        templateUrl: 'sponzors-notifications/notifications.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/importants', {
        templateUrl: 'sponzors-notifications/importants.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/readed', {
        templateUrl: 'sponzors-notifications/readed.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notification/:id', {
        templateUrl: 'sponzors-notifications/detail.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/event/:eventId', {
        templateUrl: 'sponzors-event/event.html',
        controller: 'SponzorsEventController',
        controllerAs: 'sec'
      })
      .when('/sponzors/invite', {
        templateUrl: 'sponzors-invite/invite.html',
        controller: 'SponzorsInviteController',
        controllerAs: 'sic'
      })
      .when('/sponzors/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'sponzors-chat/chat.html',
        controller: 'SponzorsChatController',
        controllerAs: 'scc'
      })
      .when('/sponzors/rate/sponzorship/:sponzorshipId', {
        templateUrl: 'sponzors-rate/rate-form.html',
        controller: 'SponzorsRateController',
        controllerAs: 'src'
      })

    //Organizers
    .when('/organizers/dashboard', {
        templateUrl: 'organizers-main/main.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/sponzors', {
        templateUrl: 'organizers-sponzors/sponzors.html',
        controller: 'OrganizersSponzorsController',
        controllerAs: 'osc'
      })
      .when('/organizers/balance', {
        templateUrl: 'organizers-balance/balance.html',
        controller: 'OrganizersBalanceController',
        controllerAs: 'obc'
      })
      .when('/organizers/event/record', {
        templateUrl: 'organizers-main/record.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/news', {
        templateUrl: 'organizers-news/news.html',
        controller: 'OrganizersNewsController',
        controllerAs: 'onc'
      })
      //Organizers Notifications
      .when('/organizers/notifications', {
        templateUrl: 'organizers-notifications/notifications.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/importants', {
        templateUrl: 'organizers-notifications/importants.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/readed', {
        templateUrl: 'organizers-notifications/readed.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notification/:id', {
        templateUrl: 'organizers-notifications/detail.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      //Organizers Settings
      .when('/organizers/settings/profile', {
        templateUrl: 'organizers-settings/profile.html',
        controller: 'OrganizersProfileController',
        controllerAs: 'opc'
      })
      .when('/organizers/settings/preferences', {
        templateUrl: 'organizers-settings/preferences.html',
        controller: 'OrganizersPreferencesController',
        controllerAs: 'opc'
      })
      .when('/organizers/settings/rate', {
        templateUrl: 'organizers-settings/rate.html',
        controller: 'OrganizersRateController',
        controllerAs: 'orc'
      })
      //Organizers Tasks
      .when('/organizers/tasks', {
        templateUrl: 'organizers-tasks/tasks.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/task/:id', {
        templateUrl: 'organizers-tasks/taskId.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/tasks/create', {
        templateUrl: 'organizers-tasks/tasks_create.html',
        controller: 'OrganizersCreateTasksController',
        controllerAs: 'octc'
      })
      .when('/organizers/event/:eventId', {
        templateUrl: 'organizers-event-edit/edit.html',
        controller: 'OrganizersEventEditController',
        controllerAs: 'oeec'
      })
      .when('/organizers/add/event', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/eventbrite/:eventBriteCode', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/meetup/:meetupCode', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/organizers/sponzor/profile/:idSponsor', {
        templateUrl: 'organizers-sponzor-profile/profile.html',
        controller: 'OrganizersSponzorProfileController',
        controllerAs: 'ospc'
      })
      .when('/organizers/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'organizers-chat/chat.html',
        controller: 'OrganizersChatController',
        controllerAs: 'occ'
      })
      .when('/organizers/sponsor/rating/:sponzorshipId', {
        templateUrl: 'organizers-sponzor-rating/rating.html',
        controller: 'OrganizersSponsorRatingController',
        controllerAs: 'osrc'
      })
      .when('/organizers/event/tasks/:eventId', {
        templateUrl: 'organizers-event-tasks/tasks.html',
        controller: 'OrganizersEventTasksController',
        controllerAs: 'oetc'
      })
      .when('/organizers/invite', {
        templateUrl: 'organizers-invite/invite.html',
        controller: 'OrganizersInviteController',
        controllerAs: 'oic'
      })
      .otherwise({
        redirect: '/login'
      });
  }]);
})();
