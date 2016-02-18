/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme').config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/sponzors/dashboard', {
      templateUrl: 'scripts/sponzors-main/main.html',
      controller: 'SponzorsMasterController'
    })
    .when('/sponzors/outstanding', {
      templateUrl: 'scripts/sponzors-outstanding/outstanding.html',
      controller: 'SponzorsMasterController'
    })
    .when('/sponzors/saved', {
      templateUrl: 'scripts/sponzors-saved/saved.html',
      controller: 'SponzorsMasterController'
    })

    .when('/sponzors/settings/profile', {
      templateUrl: 'views/sponzors/dashboard/profile.html',
      controller: 'SponzorsMasterController'
     })
    .when('/sponzors/settings/preferences', {
      templateUrl: 'views/sponzors/dashboard/preferences.html',
      controller: 'SponzorsMasterController'
    })
    .when('/sponzors/invite', {
      templateUrl: 'scripts/invite/invite.html',
})
    .when('/sponzors/settings/ratings', {
      templateUrl: 'views/sponzors/dashboard/ratings.html',
      controller: 'SponzorsMasterController'
    })
    .when('/sponzors/settings', {
      templateUrl: 'views/sponzors/dashboard/profile.html',
      controller: 'SponzorsMasterController'
    })



    .when('/organizers/tasks', {
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

    .when('/organizers/chat', {
      templateUrl: 'views/organizers/chat.html',
      controller: 'ChatController'
    })
    .when('/sponzors/chat', {
      templateUrl: 'views/sponzors/chat.html',
      controller: 'ChatController'
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
      .when('/sponzors/sponzoring', {
        templateUrl: 'views/sponzors/dashboard/sponzorships.html',
        controller: 'SponzorsMasterController'
      })
      .when('/sponzors/event/:eventId', {
        templateUrl: 'views/sponzors/dashboard/event.html',
        controller: 'SponzorsEventPageController'
      })

      .when('/sponzors/sponzoring/:id', {
        templateUrl: 'views/sponzors/dashboard/sponzorshipsId.html',
        controller: 'SponzorsMasterController'
      })
      .when('/sponzors/tasks', {
        templateUrl: 'views/sponzors/dashboard/tasks.html',
        controller: 'SponzorsTasksController'
      })
      .when('/sponzors/task/:id', {
        templateUrl: 'views/sponzors/dashboard/taskId.html',
        controller: 'SponzorsTasksController'
      })
      .when('/sponzors/tasks/create', {
        templateUrl: 'views/sponzors/dashboard/tasks_create.html',
        controller: 'SponzorsTasksController'
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
      .when('/sponzors/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'views/chat.html',
        controller: 'ChatController'
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
      })
      .when('/invitefriend', {
        templateUrl: 'views/inviteFriend.html'
      })
      .when('/sponzors/notifications', {
        templateUrl: 'views/sponzors/notifications/notifications.html',
        controller: 'SponzorsNotificationsController'
      })
      .when('/sponzors/notifications/importants', {
        templateUrl: 'views/sponzors/notifications/notifications_importants.html',
        controller: 'SponzorsNotificationsController'
      })
      .when('/sponzors/notifications/readed', {
        templateUrl: 'views/sponzors/notifications/notifications_readed.html',
        controller: 'SponzorsNotificationsController'
      })
      .when('/sponzors/notification/:id', {
        templateUrl: 'views/sponzors/notifications/notification_detail.html',
        controller: 'SponzorsNotificationDetailController'
      })
      .when('/sponzors/notification/:id/reply', {
        templateUrl: 'views/sponzors/notifications/notification_reply.html',
        controller: 'SponzorsNotificationReplyController'
      })



      .otherwise({
        redirectTo: '/login'
      });
  }]);
})();
